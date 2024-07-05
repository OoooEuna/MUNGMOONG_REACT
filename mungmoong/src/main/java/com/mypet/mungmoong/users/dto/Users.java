package com.mypet.mungmoong.users.dto;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class Users {
    private int no;
    private String userId;
    private String password;
    private String userPwCheck;     // 비밀번호 확인
    private String name;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birth;
    private String address;
    private String email;           // 이메일 (mail과 동일)
    private String phone;
    private Date regDate;
    private Date updDate;
    private int enabled;            // 휴면여부
    private int role;
    private String gender;
    private String socialId;  // 소셜 ID 추가
    private String socialPlatform;  // 소셜 플랫폼 추가

    // private Trainer trainer;
    private List<UserAuth> authList;
    // private List<Pet> petList;
    // private Pet pet;

    public Users() {
    }

    public Users(String userId, String mail, String name) {
        this.userId = userId;
        this.email = mail;          // 이메일 초기화
        this.name = name;
    }

    public Users(Users user) {
        this.no = user.getNo();
        this.userId = user.getUserId();
        this.password = user.getPassword();
        this.userPwCheck = user.getUserPwCheck();
        this.name = user.getName();
        this.birth = user.getBirth();
        this.address = user.getAddress();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.regDate = user.getRegDate();
        this.updDate = user.getUpdDate();
        this.enabled = user.getEnabled();
        this.role = user.getRole();
        this.gender = user.getGender();
        // this.trainer = user.getTrainer();
        this.authList = user.getAuthList();
        // this.petList = user.getPetList();
        // this.pet = user.getPet();
    }
}
