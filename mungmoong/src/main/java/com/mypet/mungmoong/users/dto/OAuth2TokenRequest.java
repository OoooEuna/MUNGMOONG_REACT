package com.mypet.mungmoong.users.dto;

public class OAuth2TokenRequest {
    private String grantType;
    private String code;
    private String redirectUri;
    private String clientId;
    private String clientSecret;
    private String platform;  // 플랫폼 필드 추가

    // 기본 생성자
    public OAuth2TokenRequest() {
    }

    // 생성자 추가
    public OAuth2TokenRequest(String grantType, String code, String redirectUri, String clientId, String clientSecret, String platform) {
        this.grantType = grantType;
        this.code = code;
        this.redirectUri = redirectUri;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.platform = platform;
    }

    // Getter 및 Setter
    public String getGrantType() {
        return grantType;
    }

    public void setGrantType(String grantType) {
        this.grantType = grantType;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getRedirectUri() {
        return redirectUri;
    }

    public void setRedirectUri(String redirectUri) {
        this.redirectUri = redirectUri;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getPlatform() {  // 플랫폼 getter
        return platform;
    }

    public void setPlatform(String platform) {  // 플랫폼 setter
        this.platform = platform;
    }

    // toString 메소드 (디버깅용)
    @Override
    public String toString() {
        return "OAuth2TokenRequest{" +
                "grantType='" + grantType + '\'' +
                ", code='" + code + '\'' +
                ", redirectUri='" + redirectUri + '\'' +
                ", clientId='" + clientId + '\'' +
                ", clientSecret='" + clientSecret + '\'' +
                ", platform='" + platform + '\'' +  // toString에 플랫폼 추가
                '}';
    }

    public String toRequestBody() {
        return String.format(
                "grant_type=%s&code=%s&redirect_uri=%s&client_id=%s&client_secret=%s",
                grantType, code, redirectUri, clientId, clientSecret
        );
    }
}
