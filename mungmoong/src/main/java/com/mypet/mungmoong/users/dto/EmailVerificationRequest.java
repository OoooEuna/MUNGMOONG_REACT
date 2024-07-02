package com.mypet.mungmoong.users.dto;

import lombok.Data;

@Data
public class EmailVerificationRequest {
    private String email;
    private String code;

    // Getters and setters
}
