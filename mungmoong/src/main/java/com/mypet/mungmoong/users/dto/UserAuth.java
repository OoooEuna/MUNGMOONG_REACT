package com.mypet.mungmoong.users.dto;

import lombok.Data;

@Data
public class UserAuth {
    private int authNo;
    private String userId;
    private String auth;

    public UserAuth() {

    }

    public UserAuth(String userId, String auth) {
        this.userId = userId;
        this.auth = auth;
    }

}