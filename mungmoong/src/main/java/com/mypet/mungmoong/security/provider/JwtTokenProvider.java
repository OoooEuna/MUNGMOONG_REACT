package com.mypet.mungmoong.security.provider;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.mypet.mungmoong.prop.JwtProps;
import com.mypet.mungmoong.security.constants.SecurityConstants;
import com.mypet.mungmoong.users.dto.CustomUser;
import com.mypet.mungmoong.users.dto.UserAuth;
import com.mypet.mungmoong.users.dto.Users;
import com.mypet.mungmoong.users.mapper.UsersMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

/**
 * 🔐 JWT 토큰 관련 기능을 제공해주는 클래스
 * ✅ 토큰 생성
 * ✅ 토큰 해석
 * ✅ 토큰 유효성 검사
 */
@Slf4j
@Component
public class JwtTokenProvider {

    @Autowired
    private JwtProps jwtProps;

    @Autowired
    private UsersMapper userMapper;

    @Autowired
    private RestTemplate restTemplate;

    /**
     * 👩‍💼➡🔐 토큰 생성
     * @param userNo 사용자 번호
     * @param userId 사용자 아이디
     * @param roles 사용자 권한 리스트
     * @return 생성된 JWT 토큰
     */
    public String createToken(int userNo, String userId, List<String> roles) {
        byte[] signingKey = getSigningKey();

        // JWT 토큰 생성
        String jwt = Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(signingKey), Jwts.SIG.HS512)
                .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE) // 헤더 설정
                .setExpiration(new Date(System.currentTimeMillis() + 864000000)) // 토큰 만료 시간 설정 (10일)
                .claim("uno", userNo) // 클레임 설정: 사용자 번호
                .claim("uid", userId) // 클레임 설정: 사용자 아이디
                .claim("rol", roles) // 클레임 설정: 권한
                .compact();

        log.info("jwt : " + jwt);

        return jwt;
    }

    /**
     * 🔐➡👩‍💼 토큰 해석
     * @param authHeader Authorization 헤더
     * @return UsernamePasswordAuthenticationToken 객체
     */
    public UsernamePasswordAuthenticationToken getAuthentication(String authHeader) {
        if (authHeader == null || authHeader.isEmpty())
            return null;

        try {
            // jwt 추출
            String jwt = authHeader.replace("Bearer ", "");

            // 🔐➡👩‍💼 JWT 파싱
            Jws<Claims> parsedToken = Jwts.parser()
                    .setSigningKey(getShaKey())
                    .build()
                    .parseClaimsJws(jwt);

            log.info("parsedToken : " + parsedToken);

            // 인증된 사용자 번호
            String userNo = parsedToken.getBody().get("uno").toString();
            int no = (userNo == null ? 0 : Integer.parseInt(userNo));
            log.info("userNo : " + userNo);

            // 인증된 사용자 아이디
            String userId = parsedToken.getBody().get("uid").toString();
            log.info("userId : " + userId);

            // 인증된 사용자 권한
            Claims claims = parsedToken.getBody();
            List<String> roles = (List<String>) claims.get("rol");
            log.info("roles : " + roles);

            // 토큰에 userId 있는지 확인
            if (userId == null || userId.isEmpty())
                return null;

            Users user = new Users();
            user.setNo(no);
            user.setUserId(userId);

            // 권한을 Users 객체에 담기
            List<UserAuth> authList = roles.stream()
                    .map(auth -> new UserAuth(userId, auth))
                    .collect(Collectors.toList());
            user.setAuthList(authList);

            // CustomUser에 권한 담기
            List<SimpleGrantedAuthority> authorities = roles.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            // DB에서 추가 사용자 정보 조회
            try {
                Users userInfo = userMapper.selectByNo(no);
                if (userInfo != null) {
                    user.setName(userInfo.getName());
                    user.setEmail(userInfo.getEmail());
                }
            } catch (Exception e) {
                log.error("Error retrieving user info from DB: " + e.getMessage());
            }

            UserDetails userDetails = new CustomUser(user);

            // 사용자 정보와 권한을 가진 UsernamePasswordAuthenticationToken 생성
            return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

        } catch (ExpiredJwtException exception) {
            log.warn("Expired JWT token: {} failed: {}", authHeader, exception.getMessage());
        } catch (UnsupportedJwtException exception) {
            log.warn("Unsupported JWT token: {} failed: {}", authHeader, exception.getMessage());
        } catch (MalformedJwtException exception) {
            log.warn("Malformed JWT token: {} failed: {}", authHeader, exception.getMessage());
        } catch (IllegalArgumentException exception) {
            log.warn("Illegal argument: {} failed: {}", authHeader, exception.getMessage());
        }

        return null;
    }

    /**
     * 🔐❓ 토큰 유효성 검사
     * @param jwt JWT 토큰
     * @return true : 유효, false : 만료 또는 유효하지 않음
     */
    public boolean validateToken(String jwt) {
        try {
            // 🔐➡👩‍💼 JWT 파싱
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(getShaKey())
                    .build()
                    .parseClaimsJws(jwt);

            log.info("::::: 토큰 만료기간 :::::");
            log.info("-> " + claims.getBody().getExpiration());

            return !claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException exception) {
            log.error("Token Expired");
            return false;
        } catch (JwtException exception) {
            log.error("Token Tampered");
            return false;
        } catch (NullPointerException exception) {
            log.error("Token is null");
            return false;
        } catch (Exception e) {
            log.error("Unknown error: " + e.getMessage());
            return false;
        }
    }

    // secretKey ➡ signingKey
    private byte[] getSigningKey() {
        return jwtProps.getSecretKey().getBytes();
    }

    // secretKey ➡ (HMAC-SHA algorithms) ➡ signingKey
    private SecretKey getShaKey() {
        return Keys.hmacShaKeyFor(getSigningKey());
    }

    // 네이버 OAuth2 사용자 정보 요청
    public Users getNaverUserInfo(String accessToken) {
        String url = "https://openapi.naver.com/v1/nid/me";
        String result = restTemplate.getForObject(url, String.class);

        // 응답 JSON 파싱 (사용자 정보 추출)
        @SuppressWarnings("unchecked")
        Map<String, Object> response = (Map<String, Object>) parseJson(result);
        Map<String, Object> userInfo = (Map<String, Object>) response.get("response");

        Users user = new Users();
        user.setUserId((String) userInfo.get("id"));
        user.setName((String) userInfo.get("name"));
        user.setEmail((String) userInfo.get("email"));

        return user;
    }

    // 카카오 OAuth2 사용자 정보 요청
    public Users getKakaoUserInfo(String accessToken) {
        String url = "https://kapi.kakao.com/v2/user/me";
        String result = restTemplate.getForObject(url, String.class);

        // 응답 JSON 파싱 (사용자 정보 추출)
        @SuppressWarnings("unchecked")
        Map<String, Object> response = (Map<String, Object>) parseJson(result);
        Map<String, Object> kakaoAccount = (Map<String, Object>) response.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        Users user = new Users();
        user.setUserId((String) response.get("id"));
        user.setName((String) profile.get("nickname"));
        user.setEmail((String) kakaoAccount.get("email"));

        return user;
    }

    // JSON 문자열을 Map으로 변환하는 메서드 (예: 사용 가능한 라이브러리 사용)
    private Map<String, Object> parseJson(String json) {
        // JSON 파싱 라이브러리 사용 예: Jackson, Gson 등
        // 아래는 Gson을 사용하는 예제
        return new Gson().fromJson(json, Map.class);
    }
}
