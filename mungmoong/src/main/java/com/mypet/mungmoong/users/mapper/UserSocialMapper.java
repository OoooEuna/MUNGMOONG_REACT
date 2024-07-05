package com.mypet.mungmoong.users.mapper;

import com.mypet.mungmoong.users.dto.UserSocial;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserSocialMapper {
    int insert(UserSocial userSocial);
    UserSocial findBySocialId(@Param("socialId") String socialId);
    int update(UserSocial userSocial);
}
