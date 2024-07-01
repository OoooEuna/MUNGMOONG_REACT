package com.mypet.mungmoong.users.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mypet.mungmoong.pet.dto.Pet;
import com.mypet.mungmoong.users.dto.SocialUserResponse;
import com.mypet.mungmoong.users.dto.UserJoinRequest;
import com.mypet.mungmoong.users.dto.Users;


import com.mypet.mungmoong.users.service.UsersService;

@Controller("usersController")
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @GetMapping("/{page}")
    public String test(@PathVariable("page") String page) {
        return "/users/" + page;
    }
// 
//     @GetMapping("/login")
//     public String loginPage(HttpServletRequest request, Model model) {
//         Cookie[] cookies = request.getCookies();
//         String rememberedUserId = null;
//         boolean rememberUserId = false;
// 
//         if (cookies != null) {
//             for (Cookie cookie : cookies) {
//                 if ("remember-id".equals(cookie.getName())) {
//                     rememberedUserId = cookie.getValue();
//                     rememberUserId = true;
//                     break;
//                 }
//             }
//         }
// 
//         model.addAttribute("userValue", rememberedUserId);
//         model.addAttribute("rememberId", rememberUserId);
//         return "users/login";
//     }

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

  
   
   


}
