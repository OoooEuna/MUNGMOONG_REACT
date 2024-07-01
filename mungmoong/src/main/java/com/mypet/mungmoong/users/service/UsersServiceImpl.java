package com.mypet.mungmoong.users.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mypet.mungmoong.pet.dto.Pet;
import com.mypet.mungmoong.pet.mapper.PetMapper;

import com.mypet.mungmoong.users.dto.UserAuth;

import com.mypet.mungmoong.users.dto.Users;
import com.mypet.mungmoong.users.mapper.UsersMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("userServiceImplForUsers")
public class UsersServiceImpl implements UsersService {

    private UsersMapper userMapper;
    private PetMapper petMapper;
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    public UsersServiceImpl(UsersMapper userMapper, PetMapper petMapper, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userMapper = userMapper;
        this.petMapper = petMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public boolean login(Users user)  {
        // 💍 토큰 생성
        String username = user.getUserId(); // 아이디
        String password = user.getPassword(); // 암호화되지 않은 비밀번호
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);

        // 토큰을 이용하여 인증
        Authentication authentication = authenticationManager.authenticate(token);

        // 인증 여부 확인
        boolean result = authentication.isAuthenticated();

        // 시큐리티 컨텍스트에 등록
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return result;
    }

    @Override
    public Users select(String username) {
        Users user = userMapper.select(username);
        return user;
    }



    @Override
    public int join(Users user) throws Exception {
        String username = user.getUserId();
        String password = user.getPassword();
        String encodedPassword = passwordEncoder.encode(password); // 🔒 비밀번호 암호화
        user.setPassword(encodedPassword);

        // ############################## 06-14 수정 ##############################
        // 계정 활성화 설정
        user.setEnabled(1); // 수정된 부분
        // #########################################################################


        // 회원 등록
        int result = userMapper.join(user);

        if (result > 0) {
            // 회원 기본 권한 등록
            UserAuth userAuth = new UserAuth();
            userAuth.setUserId(username);
            userAuth.setAuth("ROLE_USER");
            result = userMapper.insertAuth(userAuth);

            // 펫 등록
            Pet pet = user.getPet();
            petMapper.insertPet(pet);
        }
        return result;
    }

    @Override
    public int update(Users user) throws Exception {


        return userMapper.update(user);
    }

   
  
}
