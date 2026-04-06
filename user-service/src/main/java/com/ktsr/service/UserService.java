package com.ktsr.service;

import com.ktsr.entity.User;

import java.util.List;

public interface UserService {

    User createUser(User user);
    List<User> getAllUsers();
    User getUserById(Long id);
    User updateUser(User user, Long id);
    String deleteUser(Long id);

    User getUserFromJwt(String jwt) throws Exception;


}
