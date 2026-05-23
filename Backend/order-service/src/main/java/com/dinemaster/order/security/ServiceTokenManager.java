package com.dinemaster.order.security;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class ServiceTokenManager {

    private volatile String token;
    private final RestTemplate restTemplate = new RestTemplate();

    public synchronized String getToken() {
        if (token != null && !token.isBlank()) {
            return token;
        }
        try {
            token = fetchToken();
        } catch (Exception ignored) {
            token = null;
        }
        return token;
    }

    private String fetchToken() {
        Map<String, String> body = Map.of(
                "clientId", "order-service",
                "clientSecret", "order-secret-123"
        );

        Map<?, ?> response = restTemplate.postForObject(
                "http://localhost:8080/auth/service/token",
                body,
                Map.class
        );

        if (response == null || response.get("accessToken") == null) {
            throw new RestClientException("Auth service did not return accessToken");
        }
        return String.valueOf(response.get("accessToken"));
    }
}
