package com.mypet.mungmoong.users.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.mypet.mungmoong.users.dto.UserAuth;

@Mapper
public interface UserAuthMapper {

    // 사용자 권한 조회
    UserAuth selectByUserId(@Param("userId") String userId);

    // 사용자 권한 등록
    int insertAuth(UserAuth userAuth);

    // 사용자 권한 수정
    int updateAuth(UserAuth userAuth);

    // 사용자 권한 삭제
    int deleteAuth(@Param("userId") String userId);

    // 권한 확인
    boolean hasPermission(@Param("userId") String userId, @Param("requiredAuth") String requiredAuth);
}
