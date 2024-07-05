package com.mypet.mungmoong.users.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.mypet.mungmoong.users.dto.UserAuth;
import com.mypet.mungmoong.users.dto.UserSocial;
import com.mypet.mungmoong.users.dto.Users;

public interface UsersService {

    // 아이디로 회원 조회
    Users select(String id);

    // 번호로 회원 조회
    Users selectByNo(int no);

    // 회원 등록
    int insert(Users user);

    // 회원 수정
    int update(Users user) throws Exception;



    // 회원 삭제
    int delete(String userId) throws Exception;

    // 회원 권한 등록
    int insertAuth(UserAuth userAuth) throws Exception;

    // 어드민 회원 조회
    List<Users> list() throws Exception;

    // 이름과 이메일로 아이디 찾기
    Users findId(String name, String mail) throws Exception;

    // 아이디와 이메일로 비밀번호 찾기
    Users findPw(String userId, String mail) throws Exception;

    // 비밀번호 업데이트
    int updatePassword(String userId, String mail, String password) throws Exception;

    // 관리자 회원 권한 업데이트
    int roleUp(Users user) throws Exception;

    // 소셜 ID로 사용자 조회
    Users findBySocialId(String socialId);

    // 사용자 저장
    int save(Users user);
}
