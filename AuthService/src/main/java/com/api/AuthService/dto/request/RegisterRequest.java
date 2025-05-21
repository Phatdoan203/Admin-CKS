package com.api.AuthService.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {
    public String username;
    public String email;
    public String password;
}
