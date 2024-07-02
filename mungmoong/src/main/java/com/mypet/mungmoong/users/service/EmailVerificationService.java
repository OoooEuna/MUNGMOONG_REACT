package com.mypet.mungmoong.users.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class EmailVerificationService {

    private final Map<String, String> verificationCodes = new HashMap<>(); // 이메일과 인증 코드 저장

    public void saveVerificationCode(String email, String code) {
        verificationCodes.put(email, code);
    }

    public boolean verifyCode(String email, String code) {
        String storedCode = verificationCodes.get(email);
        return storedCode != null && storedCode.equals(code);
    }
}