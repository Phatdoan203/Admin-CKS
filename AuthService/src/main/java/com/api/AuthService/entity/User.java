package com.api.AuthService.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String keycloakId;

    private String username;

    private String email;

    private String role;

    private String phone;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    public User() {}

    public User(String keycloakId, String username, String email, String role, String phone) {
        this.keycloakId = keycloakId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.phone = phone;
    }
}
