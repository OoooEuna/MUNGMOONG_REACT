package com.mypet.mungmoong.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mypet.mungmoong.dto.CustomUser;
import com.mypet.mungmoong.dto.Users;
import com.mypet.mungmoong.service.UserService;

import lombok.extern.slf4j.Slf4j;




@Slf4j
@RestController
@RequestMapping("/api/users")
public class ApiUserController {

    @Autowired
    private UserService userService;

    

   

    
    /**
     * 회원가입
     * @param entity
     * @return
     * @throws Exception
     */
    @PostMapping("")
    public ResponseEntity<?> join(@RequestBody Users user) throws Exception {
        log.info("[POST] - /users");
        int result = userService.insert(user);

        if( result > 0 ) {
            log.info("회원가입 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
            log.info("회원가입 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } 
    }


    // @PreAuthorize("hasRole('ROLE_USER')")                    // 👩‍💼 사용자 권한만 허용
    // @PreAuthorize("#user.userId == authentication.name")     // 👩‍💻 인증된 사용자 자신만 허용
    // @PreAuthorize("hasRole('ROLE_USER') and #user.userId == authentication.name") // 👩‍💼 + 👩‍💻
    @PreAuthorize("hasRole('ROLE_ADMIN') or #user.userId == authentication.name")    // 👮‍♀️ + 👩‍💻
    @PutMapping("")
    public ResponseEntity<?> update(@RequestBody Users user) throws Exception {
        log.info("[PUT] - /users");
        int result = userService.update(user);

        if( result > 0 ) {
            log.info("회원수정 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
            log.info("회원수정 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } 
    }
    

    // @PreAuthorize("hasRole('ROLE_USER')")                    // 👩‍💼 사용자 권한만 허용
    // @PreAuthorize("#user.userId == authentication.name")     // 👩‍💻 인증된 사용자 자신만 허용
    // @PreAuthorize("hasRole('ROLE_USER') and #userId == authentication.name") // 👩‍💼 + 👩‍💻
    @PreAuthorize("hasRole('ROLE_ADMIN') or #userId == authentication.name")    // 👮‍♀️ + 👩‍💻
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> destroy(@PathVariable("userId") String userId) throws Exception {
        log.info("[DELETE] - /users/{userId}");

        int result = userService.delete(userId);

        if( result > 0 ) {
            log.info("회원삭제 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
            log.info("회원삭제 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
        
    }
    
    
}