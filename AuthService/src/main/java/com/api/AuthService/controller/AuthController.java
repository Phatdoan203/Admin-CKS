package com.api.AuthService.controller;

import com.api.AuthService.dto.request.LoginRequest;
import com.api.AuthService.dto.request.LogoutRequest;
import com.api.AuthService.dto.request.RegisterRequest;
import com.api.AuthService.dto.request.TokenResponse;
import com.api.AuthService.dto.response.KeycloakTokenResponse;
import com.api.AuthService.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try{
            authService.createUser(request.getUsername(), request.getEmail(), request.getPassword(), request.getRoleName());
            KeycloakTokenResponse tokenResponse = authService
                    .getToken(request.getUsername(), request.getPassword())
                    .block();
            return ResponseEntity.status(201).body(tokenResponse);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            KeycloakTokenResponse tokenResponse = authService
                    .getToken(request.getUsername(), request.getPassword())
                    .block();
            return ResponseEntity.ok(tokenResponse);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequest request) {
        try {
            authService.logout(request.getRefreshToken());
            return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody String refreshToken) {
        try {
            TokenResponse response = authService.getTokenByRefreshToken(refreshToken);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
