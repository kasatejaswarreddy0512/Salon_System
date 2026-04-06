package com.ktsr.service.impl;

import com.ktsr.DTO.KeycloakUserDto;
import com.ktsr.entity.User;
import com.ktsr.repository.UserRepository;
import com.ktsr.service.KeyCloakService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServicesImpl implements UserService {

    private final UserRepository userRepository;
    private final KeyCloakService keyCloakService;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        throw new RuntimeException("User not found");
    }

    @Override
    public User updateUser(User user, Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isEmpty()){
            throw new RuntimeException("User not found");
        }
        User updatedUser = userOptional.get();
        updatedUser.setFullName(user.getFullName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setPassword(user.getPassword());
        updatedUser.setPhoneNumber(user.getPhoneNumber());
        updatedUser.setRole(user.getRole());
        return userRepository.save(updatedUser);
    }

    @Override
    public String deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()){
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    return "User Deleted Successfully....👌";
    }

    @Override
    public User getUserFromJwt(String jwt) throws Exception {
        KeycloakUserDto userDto=keyCloakService.fetchUserProfileBtJwt(jwt);
        return userRepository.findByEmail(userDto.getEmail());
    }
}
