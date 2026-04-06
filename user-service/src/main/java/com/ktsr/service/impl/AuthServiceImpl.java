package com.ktsr.service.impl;

import com.ktsr.DTO.SignupDTO;
import com.ktsr.DTO.TokenResponse;
import com.ktsr.entity.User;
import com.ktsr.repository.UserRepository;
import com.ktsr.response.AuthResponse;
import com.ktsr.service.AuthService;
import com.ktsr.service.KeyCloakService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl  implements AuthService {

    private final UserRepository userRepository;
    private final KeyCloakService keyCloakService;

    @Override
    public AuthResponse login(String username, String password) throws Exception {
        TokenResponse  tokenResponse=keyCloakService.getAdminAccessToken(username,
                password,"password",null);


        AuthResponse authResponse=new AuthResponse();
        authResponse.setRefreshToken(tokenResponse.getRefreshToken());
        authResponse.setJwtToken(tokenResponse.getAccessToken());
        authResponse.setMessage("Login Successfully..!");

        return authResponse;

    }

    @Override
    public AuthResponse signup(SignupDTO signupDTO) throws Exception {
        keyCloakService.createUser(signupDTO);

        User user=new User();
        user.setUsername(signupDTO.getUsername());
        user.setPassword(signupDTO.getPassword());
        user.setEmail(signupDTO.getEmail());
        user.setRole(signupDTO.getRole());
        user.setFullName(signupDTO.getFullName());
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        TokenResponse  tokenResponse=keyCloakService.getAdminAccessToken(signupDTO.getUsername(),
                signupDTO.getPassword(),"password",null);

        AuthResponse authResponse=new AuthResponse();
        authResponse.setRefreshToken(tokenResponse.getRefreshToken());
        authResponse.setJwtToken(tokenResponse.getAccessToken());
        authResponse.setRole(user.getRole());
        authResponse.setMessage("Registered Successfully..!");

        return authResponse;
    }

    @Override
    public AuthResponse getAccessTokenFromRefreshToken(String refreshToken) throws Exception {

        TokenResponse  tokenResponse=keyCloakService.getAdminAccessToken(null,
                null,"refresh_token",refreshToken);

        AuthResponse authResponse=new AuthResponse();
        authResponse.setRefreshToken(tokenResponse.getRefreshToken());
        authResponse.setJwtToken(tokenResponse.getAccessToken());
        authResponse.setMessage("Access Token Received Successfully..!");

        return authResponse;
    }
}
