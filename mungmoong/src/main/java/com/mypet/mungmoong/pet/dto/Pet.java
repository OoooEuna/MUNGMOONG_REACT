package com.mypet.mungmoong.pet.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Pet {
    private int petNo;
    private String petname;
    private String type;
    private int age;
    private String petgender;
    private String petcharacter;
    private Date regDate;
    private Date updDate;
    private String userId;
    private String specialNotes;

}   