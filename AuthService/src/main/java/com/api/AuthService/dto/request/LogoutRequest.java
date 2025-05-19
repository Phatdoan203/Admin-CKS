package com.api.AuthService.dto.request;

import lombok.Data;

@Data
public class LogoutRequest {
    public String refreshToken;
}

