package com.mypet.mungmoong.users.service;

import com.mypet.mungmoong.users.dto.UserSocial;
import java.util.Optional;

public interface UserSocialService {
    int insert(UserSocial userSocial) ;
    Optional<UserSocial> findBySocialId(String socialId) ;
    int update(UserSocial userSocial);
}
