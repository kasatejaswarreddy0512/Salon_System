package com.ktsr.response;

import com.ktsr.DTO.UserRole;
import lombok.Data;

@Data
public class AuthResponse {

    private String jwtToken;
    private String refreshToken;
    private String message;
    private String title;
    private UserRole role;

}
