package com.mypet.mungmoong.users.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mypet.mungmoong.users.dto.EmailVerificationRequest;
import com.mypet.mungmoong.users.service.EmailService;
import com.mypet.mungmoong.users.service.EmailVerificationService;

@RestController
@RequestMapping("/api")
public class EmailVerificationController {

    private final EmailService emailService;
    private final EmailVerificationService emailVerificationService;

    public EmailVerificationController(EmailService emailService, EmailVerificationService emailVerificationService) {
        this.emailService = emailService;
        this.emailVerificationService = emailVerificationService;
    }

    @PostMapping("/send-email-verification")
    public ResponseEntity<String> sendEmailVerification(@RequestBody EmailVerificationRequest request) {
        String email = request.getEmail();
        String verificationCode = generateVerificationCode();
        
        // Save the verification code associated with the email in the database
        emailVerificationService.saveVerificationCode(email, verificationCode);

        // Send verification email
        String subject = "이메일 인증";
        String text = "인증 코드: " + verificationCode;
        emailService.sendEmail(email, subject, text);

        return ResponseEntity.ok("이메일 인증 코드가 전송되었습니다.");
    }

    @PostMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestBody EmailVerificationRequest request) {
        String code = request.getCode();
        String email = request.getEmail();
        
        if (code == null || code.isEmpty()) {
            return ResponseEntity.badRequest().body("인증 코드를 입력해 주세요.");
        }
        
        boolean isVerified = emailVerificationService.verifyCode(email, code);
        
        if (isVerified) {
            return ResponseEntity.ok("이메일 인증이 완료되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("인증 코드가 일치하지 않습니다.");
        }
    }

    private String generateVerificationCode() {
        // Generate a 6-digit random number as a string
        return String.format("%06d", (int) (Math.random() * 1000000));
    }
}
