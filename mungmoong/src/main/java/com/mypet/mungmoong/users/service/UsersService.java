package com.mypet.mungmoong.users.service;


import javax.servlet.http.HttpServletRequest;

import com.mypet.mungmoong.users.dto.Users;


public interface UsersService {

    // 회원 등록
    public int insert(Users user) throws Exception;

    // 회원 조회
    public Users select(int userNo) throws Exception;

    // 로그인
    public void login(Users user, HttpServletRequest requset) throws Exception;

    // 회원 수정
    public int update(Users user) throws Exception;

    // 회원 삭제
    public int delete(String userId) throws Exception;
    
}