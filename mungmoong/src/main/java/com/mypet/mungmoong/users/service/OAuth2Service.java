package com.mypet.mungmoong.users.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mypet.mungmoong.security.provider.JwtTokenProvider;
import com.mypet.mungmoong.users.dto.UserSocial;
import com.mypet.mungmoong.users.dto.Users;
import com.mypet.mungmoong.users.mapper.UserSocialMapper;
import com.mypet.mungmoong.users.mapper.UsersMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Slf4j
@Service
public class OAuth2Service {

    @Autowired
    private UsersMapper usersMapper;

    @Autowired
    private UserSocialMapper userSocialMapper;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ObjectMapper objectMapper; // 주입받기

    @Autowired
    private RestTemplate restTemplate; // 주입받기

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;

    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String kakaoTokenUri;

    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String naverClientId;

    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String naverClientSecret;

    @Value("${spring.security.oauth2.client.provider.naver.token-uri}")
    private String naverTokenUri;

    public String exchangeCodeForToken(String code, String platform) {
        String tokenUri = getTokenUriForPlatform(platform);
        String clientId = platform.equals("naver") ? naverClientId : kakaoClientId;
        String clientSecret = platform.equals("naver") ? naverClientSecret : kakaoClientSecret;

        MultiValueMap<String, String> requestBodyMap = new LinkedMultiValueMap<>();
        requestBodyMap.add("grant_type", "authorization_code");
        requestBodyMap.add("code", code);
        requestBodyMap.add("redirect_uri", getRedirectUriForPlatform(platform));
        requestBodyMap.add("client_id", clientId);
        requestBodyMap.add("client_secret", clientSecret);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBodyMap, headers);

        log.info("Sending OAuth2 token request to: {}", tokenUri);
        ResponseEntity<String> response = restTemplate.exchange(
            tokenUri,
            HttpMethod.POST,
            requestEntity,
            String.class
        );

        log.info("OAuth2 token response status: {}", response.getStatusCode());
        log.debug("OAuth2 token response body: {}", response.getBody());

        if (response.getStatusCode().is2xxSuccessful()) {
            try {
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                String accessToken = jsonNode.path("access_token").asText("unknown_access_token");
                log.info("Access Token: {}", accessToken);

                // Fetch user info
                String userId = getUserInfoFromToken(accessToken, platform, "id");
                String userName = getUserInfoFromToken(accessToken, platform, "name");
                String userEmail = getUserInfoFromToken(accessToken, platform, "email");

                log.info("OAuth2 token exchange successful for user ID: {}", userId);

                saveOrUpdateUserInfo(userId, userName, userEmail, platform);

                return jwtTokenProvider.createToken(0, userId, null);
            } catch (IOException e) {
                log.error("Failed to parse token response", e);
                throw new RuntimeException("Failed to parse token response", e);
            }
        } else {
            log.error("Failed to exchange code for token. Status: {}", response.getStatusCode());
            throw new RuntimeException("Failed to exchange code for token. Status: " + response.getStatusCode());
        }
    }

    public void saveOrUpdateUserInfo(String userId, String userName, String userEmail, String platform) {
        Users existingUser = usersMapper.selectByUserId(userId);
        if (existingUser == null) {
            Users newUser = new Users();
            newUser.setUserId(userId);
            newUser.setName(userName);
            newUser.setEmail(userEmail);
            newUser.setSocialId(userId);
            newUser.setSocialPlatform(platform);
            usersMapper.insert(newUser);
    
            UserSocial userSocial = new UserSocial();
            userSocial.setUserId(userId);
            userSocial.setSocialId(userId);
            userSocial.setSocialPlatform(platform);
            userSocial.setName(userName);
            userSocial.setMail(userEmail);
            userSocialMapper.insert(userSocial);
    
            log.info("User created and saved to database: {}", userId);
        } else {
            // Update logic if user already exists
            existingUser.setName(userName);
            existingUser.setEmail(userEmail);
            usersMapper.update(existingUser);
    
            UserSocial userSocial = userSocialMapper.findBySocialId(userId);
            if (userSocial != null) {
                userSocial.setName(userName);
                userSocial.setMail(userEmail);
                userSocialMapper.update(userSocial);
                log.info("User updated in database: {}", userId);
            } else {
                log.warn("User social record not found for user ID: {}", userId);
            }
        }
    }
    

    private String getUserInfoFromToken(String accessToken, String platform, String infoType) {
        String userInfoUri = platform.equals("kakao") ? "https://kapi.kakao.com/v2/user/me" : "https://openapi.naver.com/v1/nid/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        log.info("Fetching user info from: {}", userInfoUri);
        ResponseEntity<String> response = restTemplate.exchange(
            userInfoUri,
            HttpMethod.GET,
            requestEntity,
            String.class
        );

        log.info("User info response status: {}", response.getStatusCode());
        log.debug("User info response body: {}", response.getBody());

        if (response.getStatusCode().is2xxSuccessful()) {
            try {
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                String info = null;

                if (platform.equals("kakao")) {
                    switch (infoType) {
                        case "id":
                            info = jsonNode.path("id").asText("Unknown ID");
                            break;
                        case "name":
                            info = jsonNode.path("properties").path("nickname").asText("Unknown Name");
                            break;
                        case "email":
                            info = jsonNode.path("kakao_account").path("email").asText("Unknown Email");
                            break;
                        default:
                            throw new IllegalArgumentException("Unknown infoType: " + infoType);
                    }
                } else {
                    switch (infoType) {
                        case "id":
                            info = jsonNode.path("response").path("id").asText("Unknown ID");
                            break;
                        case "name":
                            info = jsonNode.path("response").path("name").asText("Unknown Name");
                            break;
                        case "email":
                            info = jsonNode.path("response").path("email").asText("Unknown Email");
                            break;
                        default:
                            throw new IllegalArgumentException("Unknown infoType: " + infoType);
                    }
                }

                log.info("Fetched user {}: {}", infoType, info);
                return info;
            } catch (IOException e) {
                log.error("Failed to parse user info response", e);
                throw new RuntimeException("Failed to parse user info response", e);
            }
        } else {
            log.error("Failed to retrieve user info. Status: {}", response.getStatusCode());
            throw new RuntimeException("Failed to retrieve user info. Status: " + response.getStatusCode());
        }
    }

    private String getTokenUriForPlatform(String platform) {
        if (platform.equals("naver")) {
            return naverTokenUri;
        } else if (platform.equals("kakao")) {
            return kakaoTokenUri;
        } else {
            throw new IllegalArgumentException("Unknown platform: " + platform);
        }
    }

    private String getRedirectUriForPlatform(String platform) {
        if (platform.equals("naver")) {
            return "http://localhost:8080/api/oauth2/callback/naver";
        } else if (platform.equals("kakao")) {
            return "http://localhost:8080/api/oauth2/callback/kakao";
        } else {
            throw new IllegalArgumentException("Unknown platform: " + platform);
        }
    }
}
