package com.mypet.mungmoong.users.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mypet.mungmoong.trainer.dto.Option;
import com.mypet.mungmoong.trainer.dto.Page;
import com.mypet.mungmoong.users.dto.LoginResponse;
import com.mypet.mungmoong.users.dto.SocialUserResponse;
import com.mypet.mungmoong.users.dto.UserAuth;
import com.mypet.mungmoong.users.dto.UserJoinRequest;
import com.mypet.mungmoong.users.dto.UserSocial;
import com.mypet.mungmoong.users.dto.Users;

@Service
public interface UsersService {

    // 로그인
    public boolean login(Users user);

    // 조회
    public Users select(String id) ;

    // 회원 가입
    public int join(Users user) throws Exception;

    // 회원 수정
    public int update(Users user) throws Exception;

}
