// package com.mypet.mungmoong.users.service;
// 
// import com.fasterxml.jackson.databind.JsonNode;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.mypet.mungmoong.users.dto.OAuth2TokenResponse;
// import com.mypet.mungmoong.users.dto.UserSocial;
// import com.mypet.mungmoong.users.dto.Users;
// 
// import lombok.extern.slf4j.Slf4j;
// 
// import com.mypet.mungmoong.users.dto.UserAuth;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.http.*;
// import org.springframework.stereotype.Service;
// import org.springframework.util.LinkedMultiValueMap;
// import org.springframework.util.MultiValueMap;
// import org.springframework.web.client.RestTemplate;
// 
// import java.util.Date;
// import java.util.HashMap;
// import java.util.Map;
// 
// @Slf4j
// @Service
// public class OAuth2Service {
// 
//     private static final Logger logger = LoggerFactory.getLogger(OAuth2Service.class);
// 
//     @Autowired
//     private UsersService usersService;
// 
//     @Autowired
//     private UserSocialService userSocialService;
// 
//     @Autowired
//     private UserAuthService userAuthService;
// 
//     @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
//     private String kakaoClientId;
// 
//     @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
//     private String kakaoClientSecret;
// 
//     @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
//     private String kakaoTokenUri;
// 
//     @Value("${spring.security.oauth2.client.registration.naver.client-id}")
//     private String naverClientId;
// 
//     @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
//     private String naverClientSecret;
// 
//     @Value("${spring.security.oauth2.client.provider.naver.token-uri}")
//     private String naverTokenUri;
// 
//     private final ObjectMapper objectMapper = new ObjectMapper();
// 
//     public OAuth2TokenResponse exchangeCodeForToken(String code, String platform) {
//         String tokenUri = getTokenUriForPlatform(platform);
//         String clientId = platform.equals("naver") ? naverClientId : kakaoClientId;
//         String clientSecret = platform.equals("naver") ? naverClientSecret : kakaoClientSecret;
// // 
// //         String requestBody = "grant_type=authorization_code" +
// //                              "&code=" + code +
// //                              "&redirect_uri=" + getRedirectUriForPlatform(platform) +
// //                              "&client_id=" + clientId +
// //                              "&client_secret=" + clientSecret;
//     
// 
// //         HttpHeaders headers = new HttpHeaders();
// //         headers.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
// //         HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
// // 
// //         
// //         ResponseEntity<String> response = restTemplate.exchange(tokenUri, HttpMethod.POST, requestEntity, String.class);
// //         log.info("response : " + response);
// 
// 
//         // RestTemplate 인스턴스 생성
//         RestTemplate restTemplate = new RestTemplate();
// 
//         // 요청 본문 데이터 설정 (폼 데이터)
//         // Map<String, String> requestBodyMap = new HashMap<>();
//         MultiValueMap<String, String> requestBodyMap = new LinkedMultiValueMap<>();
// 
//         requestBodyMap.add("grant_type", "authorization_code");
//         requestBodyMap.add("code", code);
//         requestBodyMap.add("redirect_uri", getRedirectUriForPlatform(platform));
//         requestBodyMap.add("client_id", clientId);
//         requestBodyMap.add("client_secret", clientSecret);
// 
// 
//         // HttpHeaders 인스턴스를 사용하여 헤더 설정
//         HttpHeaders headers = new HttpHeaders();
//         headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//         // headers.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
// 
//         // HttpEntity 인스턴스를 사용하여 요청 본문과 헤더를 설정
//         // HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBodyMap, headers);
//         HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBodyMap, headers);
// 
//         // POST 요청을 보낼 URL
//         String url = tokenUri;
// 
//         log.info("requestEntity : " + requestEntity);
// 
//         // POST 요청 보내기
//         ResponseEntity<String> response = restTemplate.exchange(
//             url,
//             HttpMethod.POST,
//             requestEntity,
//             String.class
//         );
// 
// 
// 
//         log.info("::::::::::::::::::: requestBodyMap :::::::::::::::::::::::");
//         log.info(requestBodyMap.toString());
//         
//         log.info("::::::::::::::::::: response :::::::::::::::::::::::");
//         log.info(response.toString());
//         log.info("::::::::::::::::::: response body :::::::::::::::::::::::");
//         log.info(response.getBody());
// 
//         if (response.getStatusCode().is2xxSuccessful()) {
//             try {
//                 
//                 // log.info("::::::::::::::::::: jsonNode tokenResponse platform :::::::::::::::::::::::");
//                 // log.info("+++" + jsonNode);
//                 // log.info("+++" + tokenResponse);
//                 // log.info("+++" + platform);
//                 // OAuth2TokenResponse tokenResponse = new OAuth2TokenResponse();
//                 // tokenResponse.setAccessToken(jsonNode.get("access_token").asText());
//                 // tokenResponse.setTokenType(jsonNode.get("token_type").asText());
//                 // tokenResponse.setExpiresIn(jsonNode.get("expires_in").asInt());
//                 // tokenResponse.setRefreshToken(jsonNode.has("refresh_token") ? jsonNode.get("refresh_token").asText() : null);
//                 // tokenResponse.setScope(jsonNode.get("scope").asText());
// 
//                 
//                 JsonNode jsonNode = objectMapper.readTree(response.getBody());
//                 String accessToken = jsonNode.get("access_token").asText();
//                 
// 
//                 // 
// 
//                 restTemplate = new RestTemplate();
//                 headers = new HttpHeaders();
//                 headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//                 String authorization = "Bearer " + accessToken;
//                 headers.set("Authorization",authorization);
// 
//                 requestEntity = new HttpEntity<>(headers);
// 
//                 // POST 요청을 보낼 URL
//                 url = "https://kapi.kakao.com/v2/user/me";
// 
//                 log.info("requestEntity : " + requestEntity);
// 
//                 // POST 요청 보내기
//                 response = restTemplate.exchange(
//                     url,
//                     HttpMethod.POST,
//                     requestEntity,
//                     String.class
//                 );
//                 
//                 log.info(":::::: 사용자 정보 response ::::::::::");
//                 log.info("response : " + response);
// 
//                 // Save or update user information
//                 saveOrUpdateUser(jsonNode, platform, response);
//                 // return tokenResponse;
//                 return null;
// 
//             } catch (Exception e) {
//                 logger.error("Failed to parse token response", e);
//                 throw new RuntimeException("Failed to parse token response", e);
//             }
//         } else {
//             logger.error("Failed to exchange code for token. Status: {}", response.getStatusCode());
//             throw new RuntimeException("Failed to exchange code for token. Status: " + response.getStatusCode());
//         }
//     }
// 
//     private void saveOrUpdateUser(JsonNode jsonNode, String platform, OAuth2TokenResponse tokenResponse) {
//         String socialId = jsonNode.get("id").asText();
//         String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
//         String picture = jsonNode.has("picture") ? jsonNode.get("picture").asText() : null;
//         String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
// 
//         Users user = usersService.findBySocialId(socialId);
//         if (user == null) {
//             user = new Users();
//             user.setUserId(email); // 이메일을 사용자 ID로 사용
//             // 사용자 권한 초기 설정 (예: "ROLE_USER")
//             UserAuth userAuth = new UserAuth(email, "ROLE_USER");
//             userAuthService.saveUserAuth(userAuth);
//         }
// 
//         user.setSocialId(socialId);
//         user.setSocialPlatform(platform);
//         user.setName(name);
//         user.setEmail(email);
//         user.setRegDate(new Date()); // 가입 날짜 설정
//         user.setUpdDate(new Date()); // 업데이트 날짜 설정
// 
//         // Save or update user
//         usersService.save(user);
// 
//         // Save or update UserSocial
//         UserSocial userSocial = new UserSocial();
//         userSocial.setUserId(user.getUserId());
//         userSocial.setSocialId(socialId);
//         userSocial.setSocialPlatform(platform);
//         userSocial.setName(name);
//         userSocial.setMail(email);
//         userSocial.setPicture(picture);
//         userSocial.setLinkedDate(new Date());
//         userSocial.setUpdatedDate(new Date());
// 
//         if (userSocialService.findBySocialId(socialId).isEmpty()) {
//             userSocialService.insert(userSocial);
//         } else {
//             userSocialService.update(userSocial);
//         }
// 
//         logger.info("User saved or updated. Social ID: {}, Platform: {}", socialId, platform);
//     }
// 
//     private String getTokenUriForPlatform(String platform) {
//         if ("naver".equalsIgnoreCase(platform)) {
//             return naverTokenUri;
//         } else if ("kakao".equalsIgnoreCase(platform)) {
//             return kakaoTokenUri;
//         } else {
//             throw new IllegalArgumentException("Unsupported platform: " + platform);
//         }
//     }
// 
//     private String getRedirectUriForPlatform(String platform) {
//         if ("naver".equalsIgnoreCase(platform)) {
//             return "http://localhost:3000/login/oauth2/code/naver";
//         } else if ("kakao".equalsIgnoreCase(platform)) {
//             return "http://localhost:3000/oauth2/callback/kakao";
//         } else {
//             throw new IllegalArgumentException("Unsupported platform: " + platform);
//         }
//     }
// }
