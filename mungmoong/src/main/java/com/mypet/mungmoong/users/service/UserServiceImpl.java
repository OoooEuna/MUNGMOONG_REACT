package com.mypet.mungmoong.users.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mypet.mungmoong.pet.dto.Pet;
import com.mypet.mungmoong.pet.mapper.PetMapper;
import com.mypet.mungmoong.trainer.dto.Option;
import com.mypet.mungmoong.trainer.dto.Page;

import com.mypet.mungmoong.users.dto.UserAuth;

import com.mypet.mungmoong.users.dto.Users;
import com.mypet.mungmoong.users.mapper.UsersMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("userServiceImplForUsers")
public class UserServiceImpl implements UsersService {

    private final UsersMapper userMapper;
    private final PetMapper petMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserServiceImpl(UsersMapper userMapper, PetMapper petMapper, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userMapper = userMapper;
        this.petMapper = petMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

//     @Override
//     public boolean login(Users user, HttpServletRequest request) throws Exception {
//         String username = user.getUserId();
//         String password = user.getPassword();
// 
//         // 아이디, 패스워드 인증 토큰 생성
//         UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
// 
//         // 토큰에 요청정보를 등록
//         token.setDetails(new WebAuthenticationDetails(request));
// 
//         // 인증(로그인)
//         Authentication authentication = authenticationManager.authenticate(token);
//         boolean result = authentication.isAuthenticated();
// 
//         // 시큐리티 컨텍스트에 등록
//         SecurityContextHolder.getContext().setAuthentication(authentication);
// 
//         return result;
//     }

    @Override
    public Users select(String username) throws Exception {
        return userMapper.select(username);
    }

    @Override
    public int insert(Users user) throws Exception {
        String username = user.getUserId();
        String password = user.getPassword();
        String encodedPassword = passwordEncoder.encode(password); // 비밀번호 암호화
        user.setPassword(encodedPassword);
        user.setEnabled(1); // 계정 활성화 설정

        // 회원 등록
        int result = userMapper.join(user);

        if (result > 0) {
            // 회원 기본 권한 등록
            UserAuth userAuth = new UserAuth();
            userAuth.setUserId(username);
            userAuth.setAuth("ROLE_USER");
            result = userMapper.insertAuth(userAuth);

            // // 펫 등록
            // Pet pet = user.getPet();
            // if (pet != null) {
            //     petMapper.insertPet(pet);
            // }
        }
        return result;
    }

    @Override
    public int update(Users user) throws Exception {
        String password = user.getPassword();
        if (password != null && !password.isEmpty()) {
            String encodedPassword = passwordEncoder.encode(password);
            user.setPassword(encodedPassword);
        }

        return userMapper.update(user);
    }

    @Override
    public int Myupdate(Users user) throws Exception {
        Users currentUser = userMapper.select(user.getUserId());

        if (currentUser == null) {
            throw new Exception("User not found");
        }

        // 비밀번호가 변경된 경우에만 암호화
        if (user.getPassword() != null && !user.getPassword().isEmpty() &&
            !passwordEncoder.matches(user.getPassword(), currentUser.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            // 비밀번호가 변경되지 않았다면 현재 비밀번호를 유지
            user.setPassword(currentUser.getPassword());
        }

        return userMapper.update(user);
    }

    @Override
    public int insertAuth(UserAuth userAuth) throws Exception {
        return userMapper.insertAuth(userAuth);
    }

    @Override
    public List<Users> list(Page page, Option option) throws Exception {
        return userMapper.list(page, option);
    }

    @Override
    public int delete(String userId) throws Exception {
        return userMapper.delete(userId);
    }

    @Override
    public Users findId(String name, String mail) throws Exception {
        return userMapper.findId(name, mail);
    }

    @Override
    public Users findPw(String userId, String mail) throws Exception {
        return userMapper.findPw(userId, mail);
    }

    @Override
    public int updatePassword(String userId, String mail, String password) throws Exception {
        String hashedPassword = passwordEncoder.encode(password); // 비밀번호 해싱
        return userMapper.updatePassword(userId, mail, hashedPassword); // 해시된 비밀번호 저장
    }

    @Override
    public int roleUp(Users user) throws Exception {
        log.info("user : " + user);
        int result = userMapper.roleUp(user);
        log.info("result : " + result);

        if (result > 0) {
            log.info("권한이 " + user.getRole() + "으로 업데이트 됨!");
            UserAuth userAuth = new UserAuth();
            userAuth.setUserId(user.getUserId());
            userAuth.setAuth("ROLE_TRAINER");
            insertAuth(userAuth);
        }
        return result;
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

            // // 펫 등록
            // Pet pet = user.getPet();
            // petMapper.insertPet(pet);
        }
        return result;
    }

 

//     @Override
//     public int insertSocial(UserSocial userSocial) throws Exception {
//         // Placeholder for future implementation
//         throw new UnsupportedOperationException("Unimplemented method 'insertSocial'");
//     }
// 
//     @Override
//     public UserSocial selectSocial(UserSocial userSocial) throws Exception {
//         // Placeholder for future implementation
//         throw new UnsupportedOperationException("Unimplemented method 'selectSocial'");
//     }
// 
//     @Override
//     public int updateSocial(UserSocial userSocial) throws Exception {
//         // Placeholder for future implementation
//         throw new UnsupportedOperationException("Unimplemented method 'updateSocial'");
//     }
// 
//     @Override
//     public Users selectBySocial(UserSocial userSocial) throws Exception {
//         // Placeholder for future implementation
//         throw new UnsupportedOperationException("Unimplemented method 'selectBySocial'");
//     }
// 
//     @Override
//     public SocialUserResponse getUserInfo(String accessToken) {
//         // Placeholder for future implementation
//         throw new UnsupportedOperationException("Unimplemented method 'getUserInfo'");
//     }
// 
//     @Override
//     public void joinUser(UserJoinRequest request) throws Exception {
//         // Placeholder for future implementation
//         throw new UnsupportedOperationException("Unimplemented method 'joinUser'");
//     }
// 
//     @Override
//     public LoginResponse doSocialLogin(SocialLoginRequest request) {
//         // Placeholder for future implementation
//         throw new UnsupportedOperationException("Unimplemented method 'doSocialLogin'");
//     }
}
