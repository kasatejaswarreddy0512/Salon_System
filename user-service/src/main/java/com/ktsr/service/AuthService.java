package com.ktsr.service;

import com.ktsr.DTO.SignupDTO;
import com.ktsr.response.AuthResponse;

public interface AuthService {

    AuthResponse login(String username, String password) throws Exception;
    AuthResponse signup(SignupDTO signupDTO) throws Exception;
    AuthResponse getAccessTokenFromRefreshToken(String refreshToken) throws Exception;


}
