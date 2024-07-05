package com.mypet.mungmoong.users.service;

import com.mypet.mungmoong.users.dto.UserAuth;

public interface UserAuthService {

    UserAuth getUserAuth(String userId);

    void saveUserAuth(UserAuth userAuth);

    void updateUserAuth(UserAuth userAuth);

    void deleteUserAuth(String userId);

    boolean hasPermission(String userId, String requiredAuth);
}
