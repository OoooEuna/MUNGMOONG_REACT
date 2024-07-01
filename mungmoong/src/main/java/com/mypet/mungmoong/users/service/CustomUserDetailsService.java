package com.mypet.mungmoong.users.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.mypet.mungmoong.users.dto.Users;
import com.mypet.mungmoong.users.mapper.UsersMapper;
import com.mypet.mungmoong.users.model.CustomUser;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userMapper.select(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new CustomUser(user);
    }
}
