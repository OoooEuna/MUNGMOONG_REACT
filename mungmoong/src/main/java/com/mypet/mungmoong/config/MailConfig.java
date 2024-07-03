package com.mypet.mungmoong.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com"); // 실제 SMTP 호스트로 변경
        mailSender.setPort(587); // 실제 SMTP 포트로 변경

        mailSender.setUsername("jtnewy01@gmail.com"); // 실제 이메일로 변경
        mailSender.setPassword("rdoc tryn opdc lbjj"); // 실제 이메일 비밀번호로 변경

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
