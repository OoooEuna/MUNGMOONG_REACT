package com.mypet.mungmoong.users.service;

import com.mypet.mungmoong.users.dto.UserAuth;
import com.mypet.mungmoong.users.dto.Users;
import com.mypet.mungmoong.users.mapper.UsersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersServiceImpl implements UsersService {

    private final UsersMapper usersMapper;

    @Autowired
    public UsersServiceImpl(UsersMapper usersMapper) {
        this.usersMapper = usersMapper;
    }

    @Override
    public Users select(String id) {
        return usersMapper.selectByUserId(id);
    }

    @Override
    public Users selectByNo(int no) {
        return usersMapper.selectByNo(no);
    }

    @Override
    public int insert(Users user) {
        return usersMapper.insert(user);
    }

    @Override
    public int update(Users user) throws Exception {
        return usersMapper.update(user);
    }

    @Override
    public int delete(String userId) throws Exception {
        return usersMapper.delete(userId);
    }

    @Override
    public int insertAuth(UserAuth userAuth) throws Exception {
        return usersMapper.insertAuth(userAuth);
    }

    @Override
    public List<Users> list() throws Exception {
        return usersMapper.list();
    }

    @Override
    public Users findId(String name, String mail) throws Exception {
        return usersMapper.findId(name, mail);
    }

    @Override
    public Users findPw(String userId, String mail) throws Exception {
        return usersMapper.findPw(userId, mail);
    }

    @Override
    public int updatePassword(String userId, String mail, String password) throws Exception {
        return usersMapper.updatePassword(userId, mail, password);
    }

    @Override
    public int roleUp(Users user) throws Exception {
        return usersMapper.roleUp(user);
    }

 

    @Override
    public int save(Users user) {
        if (user.getNo() == 0) {
            return usersMapper.insert(user);
        } else {
            return usersMapper.update(user);
        }
    }

    @Override
    public Users findBySocialId(String socialId) {
        return usersMapper.findBySocialId(socialId);
    }
}
