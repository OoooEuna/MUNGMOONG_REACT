package com.mypet.mungmoong.users.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.mypet.mungmoong.trainer.dto.Option;
import com.mypet.mungmoong.trainer.dto.Page;
import com.mypet.mungmoong.users.dto.UserAuth;
import com.mypet.mungmoong.users.dto.Users;

@Mapper
public interface UsersMapper {

    // 로그인
    Users login(String username);

    // 회원 조회 (ID로 조회)
    Users selectByUserId(String userId);

    // 회원 조회 (번호로 조회)
    Users selectByNo(int no);

    Users findBySocialId(String userId);

    // 회원 등록
    int insert(Users user);

    // 회원 수정
    int update(Users user);

    // 마이페이지 수정
    int updateMyProfile(Users user) throws Exception;

    // 회원 삭제
    int delete(String userId) throws Exception;

    // 회원 권한 등록
    int insertAuth(UserAuth userAuth);

    // 관리자 회원 목록 조회
    List<Users> list() throws Exception;

    // 이름과 이메일로 아이디 찾기
    Users findId(@Param("name") String name, @Param("mail") String mail) throws Exception;

    // 아이디와 이메일로 비밀번호 찾기
    Users findPw(@Param("userId") String userId, @Param("mail") String mail) throws Exception;

    // 비밀번호 업데이트
    int updatePassword(@Param("userId") String userId, @Param("mail") String mail, @Param("password") String password) throws Exception;

    // 관리자 회원 권한 업데이트
    int roleUp(Users user) throws Exception;   

    
}
