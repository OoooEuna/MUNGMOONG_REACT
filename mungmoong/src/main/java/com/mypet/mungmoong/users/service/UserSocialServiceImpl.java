package com.mypet.mungmoong.users.service;

import com.mypet.mungmoong.users.dto.UserSocial;
import com.mypet.mungmoong.users.mapper.UserSocialMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserSocialServiceImpl implements UserSocialService {

    private final UserSocialMapper userSocialMapper;

    @Autowired
    public UserSocialServiceImpl(UserSocialMapper userSocialMapper) {
        this.userSocialMapper = userSocialMapper;
    }

    @Override
    public int insert(UserSocial userSocial)  {
        return userSocialMapper.insert(userSocial);
    }

    @Override
    public Optional<UserSocial> findBySocialId(String socialId)  {
        return Optional.ofNullable(userSocialMapper.findBySocialId(socialId));
    }

    @Override
    public int update(UserSocial userSocial)  {
        return userSocialMapper.update(userSocial);
    }
}
