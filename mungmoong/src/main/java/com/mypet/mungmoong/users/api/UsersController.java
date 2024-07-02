package com.mypet.mungmoong.users.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.mypet.mungmoong.pet.dto.Pet;
import com.mypet.mungmoong.users.dto.Users;

import com.mypet.mungmoong.users.service.UsersService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Map<String, Integer> otpStorage = new HashMap<>();

    // 웹 페이지 요청
    @GetMapping("/{page}")
    public String test(@PathVariable("page") String page) {
        return "/users/" + page;
    }

    @GetMapping("/index")
    public String myPets(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        List<Pet> pets = (List<Pet>) session.getAttribute("pets");
        model.addAttribute("pets", pets);
        return "users/index";
    }

    @GetMapping("/using")
    public String myPets2(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        List<Pet> pets = (List<Pet>) session.getAttribute("pets");
        model.addAttribute("pets", pets);
        return "users/using";
    }

    @PostMapping("/register")
    public String registerUser(Users user, Pet pet, String userId) throws Exception {
        user.setUserId(userId);
        pet.setUserId(userId);
        // user.setPet(pet);

        int result = userService.join(user);
        if (result > 0) {
            return "redirect:/users/login";
        }
        return "redirect:/register?error";
    }

    @GetMapping("/register/check/{userId}")
    public ResponseEntity<Boolean> userCheck(@PathVariable("userId") String username) throws Exception {
        Users user = userService.select(username);
        if (user != null) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("/findId")
    public String findUserId(@RequestParam("name") String name, @RequestParam("mail") String mail, Model model) throws Exception {
        Users user = userService.findId(name, mail);
        if (user != null && user.getUserId() != null) {
            model.addAttribute("foundId", user.getUserId());
            return "/users/findIdCheck";
        } else {
            model.addAttribute("errorMessage", "해당 아이디와 이메일을 찾을 수 없습니다.");
            return "/users/findId";
        }
    }

    @GetMapping("/users/findIdCheck")
    public String showResult(@RequestParam("foundId") String foundId, Model model) {
        if (foundId == null || foundId.isEmpty()) {
            return "redirect:/";
        }
        model.addAttribute("foundId", foundId);
        return "findIdCheck";
    }

    @PostMapping("/findPw")
    public String findPWPro(@RequestParam("userId") String userId, @RequestParam("mail") String mail, Model model) throws Exception {
        Users user = userService.findPw(userId, mail);
        if (user != null && user.getPassword() != null) {
            model.addAttribute("foundId", user.getPassword());
            model.addAttribute("userId", userId);
            model.addAttribute("mail", mail);
            return "/users/changePw";
        } else {
            model.addAttribute("errorMessage", "해당 유저 정보를 찾을 수 없습니다.");
            return "/users/findId";
        }
    }

    @PostMapping("/resetPw")
    public String resetPassword(@RequestParam("userId") String userId, @RequestParam("mail") String mail,
                                @RequestParam("password") String password, Model model) throws Exception {
        String hashedPassword = passwordEncoder.encode(password);
        int result = userService.updatePassword(userId, mail, hashedPassword);
        if (result > 0) {
            model.addAttribute("message", "비밀번호가 성공적으로 변경되었습니다.");
            return "redirect:../";
        } else {
            model.addAttribute("errorMessage", "비밀번호 변경에 실패했습니다.");
            return "users/changePw";
        }
    }
// 
//     @PostMapping("/register/sendOtp")
//     public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> payload) {
//         String email = payload.get("email");
//         if (!email.contains("@")) {
//             return ResponseEntity.badRequest().body("이메일 형식이 잘못되었습니다.");
//         }
//         int otp = new Random().nextInt(999999);
//         otpStorage.put(email, otp);
//         try {
//             emailService.sendEmail(email, "[멍뭉] 이메일을 인증해주세요. ", "회원가입을 위해 이메일을 인증해주세요.\n" + "이메일 OTP번호: " + otp);
//             return ResponseEntity.ok("인증번호를 발송하였습니다.");
//         } catch (MessagingException e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in sending OTP: " + e.getMessage());
//         }
//     }
// 
//     @PostMapping("/register/verifyOtp")
//     public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> payload) {
//         String email = payload.get("email");
//         try {
//             int otp = Integer.parseInt(payload.get("otp"));
//             if (otpStorage.getOrDefault(email, -1) == otp) {
//                 otpStorage.remove(email);
//                 return ResponseEntity.ok("이메일인증 성공하였습니다.");
//             } else {
//                 return ResponseEntity.badRequest().body("잘못된 인증번호입니다.");
//             }
//         } catch (NumberFormatException e) {
//             return ResponseEntity.badRequest().body("OTP는 숫자여야 합니다.");
//         }
//     }
// 
//     @PostMapping("/find/sendOtp")
//     public ResponseEntity<?> sendOtp2(@RequestBody Map<String, String> payload) {
//         String email = payload.get("email");
//         if (!email.contains("@")) {
//             return ResponseEntity.badRequest().body("이메일 형식이 잘못되었습니다.");
//         }
//         int otp = new Random().nextInt(999999);
//         otpStorage.put(email, otp);
//         try {
//             emailService.sendEmail(email, "[멍뭉] 아이디/비밀번호 찾기 이메일을 인증해주세요. ", "이메일을 인증해주세요.\n" + "이메일 OTP번호: " + otp);
//             return ResponseEntity.ok("인증번호를 발송하였습니다.");
//         } catch (MessagingException e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in sending OTP: " + e.getMessage());
//         }
//     }
// 
//     @PostMapping("/find/verifyOtp")
//     public ResponseEntity<?> verifyOtp2(@RequestBody Map<String, String> payload) {
//         String email = payload.get("email");
//         try {
//             int otp = Integer.parseInt(payload.get("otp"));
//             if (otpStorage.getOrDefault(email, -1) == otp) {
//                 otpStorage.remove(email);
//                 return ResponseEntity.ok("이메일인증 성공하였습니다.");
//             } else {
//                 return ResponseEntity.badRequest().body("잘못된 인증번호입니다.");
//             }
//         } catch (NumberFormatException e) {
//             return ResponseEntity.badRequest().body("OTP는 숫자여야 합니다.");
//         }
//     }
// 
//     @GetMapping("/naver-login")
//     public String naverLogin(@AuthenticationPrincipal OAuth2AuthenticationToken authentication) throws Exception {
//         if (authentication == null) {
//             throw new IllegalArgumentException("Authentication information is missing");
//         }
// 
//         String registrationId = authentication.getAuthorizedClientRegistrationId();
//         OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
//                 registrationId, authentication.getName());
// 
//         if (authorizedClient != null) {
//             String accessToken = authorizedClient.getAccessToken().getTokenValue();
//             SocialUserResponse userInfo = userService.getUserInfo(accessToken);
//             userService.joinUser(new UserJoinRequest(userInfo.getUserId(), userInfo.getMail(), userInfo.getName()));
//         }
// 
//         return "redirect:/";
//     }
// 
//     @GetMapping("/update")
//     public String showUpdateForm(HttpSession session, Model model) {
//         String userId = (String) session.getAttribute("userId");
//         if (userId == null) {
//             return "redirect:/users/login";
//         }
// 
//         try {
//             Users user = userService.select(userId);
//             model.addAttribute("user", user);
//             return "users/update"; // update.html 템플릿
//         } catch (Exception e) {
//             e.printStackTrace();
//             return "redirect:/users/login";
//         }
//     }

    @PostMapping("/update")
    public String updateUser(Users user, HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return "redirect:/users/login";
        }

        user.setUserId(userId); // 세션의 userId를 설정
     
        try {
            userService.update(user);
            return "redirect:/users/index";
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/users/update?error";
        }
    }

    @PostMapping("/myupdate")
    public String myupdateUser(Users user, HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return "redirect:/users/login";
        }
    
        user.setUserId(userId); // 세션의 userId를 설정
    
        try {
            Users existingUser = userService.select(userId);
            if (existingUser == null) {
                return "redirect:/users/update?error=notfound";
            }
            user.setRole(existingUser.getRole());
            userService.Myupdate(user);
            Users updatedUser = userService.select(userId);
            session.setAttribute("user", updatedUser);
            return "redirect:/users/index";
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/users/update?error";
        }
    }
    
    @PostMapping("/api")
    public ResponseEntity<?> join(@RequestBody Users user) throws Exception {
        log.info("[POST] - /api/users");
        int result = userService.insert(user);

        if (result > 0) {
            log.info("회원가입 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } else {
            log.info("회원가입 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or #user.userId == authentication.name")
    @PutMapping("/api")
    public ResponseEntity<?> update(@RequestBody Users user) throws Exception {
        log.info("[PUT] - /api/users");
        int result = userService.update(user);

        if (result > 0) {
            log.info("회원수정 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } else {
            log.info("회원수정 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or #userId == authentication.name")
    @DeleteMapping("/api/{userId}")
    public ResponseEntity<?> destroy(@PathVariable("userId") String userId) throws Exception {
        log.info("[DELETE] - /api/users/{userId}");

        int result = userService.delete(userId);

        if (result > 0) {
            log.info("회원삭제 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } else {
            log.info("회원삭제 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }
}
