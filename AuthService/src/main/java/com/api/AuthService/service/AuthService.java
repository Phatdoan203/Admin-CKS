package com.api.AuthService.service;

import com.api.AuthService.dto.request.TokenResponse;
import com.api.AuthService.dto.response.KeycloakTokenResponse;
import com.api.AuthService.entity.User;
import com.api.AuthService.repository.UserRepository;
import com.api.AuthService.utils.KeycloakProvider;


import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class AuthService {
    @Autowired
    private WebClient webClient;
    private final KeycloakProvider keycloakProvider;
    private final UserRepository userRepository;

    public AuthService(KeycloakProvider keycloakProvider, UserRepository userRepository) {
        this.keycloakProvider = keycloakProvider;
        this.userRepository = userRepository;
    }

    public void createUser(String username, String email, String password) {
        String roleName = "USER";
        try {
            Keycloak keycloak = keycloakProvider.getInstance();
            RealmResource realmResource = keycloak.realm(keycloakProvider.getRealm());
            UsersResource userResource = realmResource.users();

            // Tạo password
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setTemporary(false);
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(password);

            // Tạo user
            UserRepresentation user = new UserRepresentation();
            user.setUsername(username);
            user.setEmail(email);
            user.setEmailVerified(true); // Thêm emailVerified
            user.setEnabled(true);
            user.setCredentials(List.of(credential)); // Gán mật khẩu trước

            Response response = userResource.create(user);
            String responseBody = response.readEntity(String.class); // Đọc response lỗi

            if (response.getStatus() != 201) {
                throw new RuntimeException("Failed to create user in Keycloak: "
                        + response.getStatus() + ", body: " + responseBody);
            }

            String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");

            // Gán role

            RoleRepresentation role = realmResource.roles().get(roleName).toRepresentation();
            userResource.get(userId).roles().realmLevel().add(List.of(role));


            // Lưu vào DB
            User newUser = userRepository.findByKeycloakId(userId).orElseGet(() -> {
                User createUser = new User();
                createUser.setKeycloakId(userId);
                createUser.setUsername(username);
                createUser.setEmail(email);
                createUser.setRole(roleName);
                return userRepository.save(createUser);
            });

        } catch (ClientErrorException ex) {
            System.out.println("Create user failed: " + ex.getResponse().readEntity(String.class));
            throw new RuntimeException("Failed to create user in Keycloak: " + ex.getResponse().getStatus());
        }
    }

    public Mono<KeycloakTokenResponse> getToken(String username, String password) {
        String tokenUrl = keycloakProvider.getServerUrl() + "/realms/" + keycloakProvider.getRealm() + "/protocol/openid-connect/token";
        return webClient.post()
                .uri(tokenUrl)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData("grant_type", "password")
                        .with("client_id", keycloakProvider.getClientId())
                        .with("username", username)
                        .with("password", password)
                )
                .retrieve()
                .bodyToMono(KeycloakTokenResponse.class);
    }

    public void logout(String refreshToken) {
        String logoutUrl = keycloakProvider.getServerUrl() + "/realms/" + keycloakProvider.getRealm() + "/protocol/openid-connect/logout";
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", keycloakProvider.getClientId());
        formData.add("refresh_token", refreshToken);

        webClient.post()
                .uri(logoutUrl)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .onStatus(HttpStatusCode::isError, response ->
                        response.bodyToMono(String.class)
                                .flatMap(err -> Mono.error(new RuntimeException("Logout failed: " + err))))
                .toBodilessEntity()
                .block();
    }

    public TokenResponse getTokenByRefreshToken(String refreshToken) {
        String url = keycloakProvider.getServerUrl() + "/realms/" + keycloakProvider.getRealm() + "/protocol/openid-connect/token";
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "refresh_token");
        formData.add("client_id", keycloakProvider.getClientId());
        formData.add("refresh_token", refreshToken);
        return webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .onStatus(HttpStatusCode::isError, response ->
                        response.bodyToMono(String.class)
                                .flatMap(body -> Mono.error(new RuntimeException("Failed to refresh token: " + body))))
                .bodyToMono(TokenResponse.class)
                .block();
    }
}
