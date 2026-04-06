package com.ktsr.controller;


import com.ktsr.DTO.LoginDTO;
import com.ktsr.DTO.SignupDTO;
import com.ktsr.response.AuthResponse;
import com.ktsr.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDTO dto) throws Exception {
        AuthResponse authResponse = authService.login(dto.getEmail(), dto.getPassword());
        return ResponseEntity.ok(authResponse);
    }


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupDTO signupDTO) throws Exception {
        AuthResponse authResponse = authService.signup(signupDTO);
        return ResponseEntity.ok(authResponse);
    }


    @GetMapping("/access-token/refresh-token/{refreshToken}")
    public ResponseEntity<AuthResponse> getAccessTokenFromRefreshToken(@PathVariable String refreshToken) throws Exception {
        AuthResponse authResponse=authService.getAccessTokenFromRefreshToken(refreshToken);
        return ResponseEntity.ok(authResponse);
    }
}
