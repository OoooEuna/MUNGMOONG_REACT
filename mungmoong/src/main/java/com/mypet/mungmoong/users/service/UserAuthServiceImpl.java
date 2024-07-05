package com.mypet.mungmoong.users.service;

import com.mypet.mungmoong.users.dto.UserAuth;
import com.mypet.mungmoong.users.mapper.UserAuthMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAuthServiceImpl implements UserAuthService {

    @Autowired
    private UserAuthMapper userAuthMapper;

    @Override
    public UserAuth getUserAuth(String userId) {
        return userAuthMapper.selectByUserId(userId);
    }

    @Override
    public void saveUserAuth(UserAuth userAuth) {
        userAuthMapper.insertAuth(userAuth);
    }

    @Override
    public void updateUserAuth(UserAuth userAuth) {
        userAuthMapper.updateAuth(userAuth);
    }

    @Override
    public void deleteUserAuth(String userId) {
        userAuthMapper.deleteAuth(userId);
    }

    @Override
    public boolean hasPermission(String userId, String requiredAuth) {
        return userAuthMapper.hasPermission(userId, requiredAuth);
    }
}
