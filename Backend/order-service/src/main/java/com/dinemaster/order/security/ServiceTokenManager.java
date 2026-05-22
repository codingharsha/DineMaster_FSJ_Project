package com.dinemaster.order.security;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class ServiceTokenManager {

    private String token;

    @PostConstruct
    public void init() {
        RestTemplate rest = new RestTemplate();

        Map<String, String> body = Map.of(
                "clientId", "order-service",
                "clientSecret", "order-secret-123"
        );

        Map<?, ?> response =
                rest.postForObject(
                        "http://localhost:8080/auth/service/token",
                        body,
                        Map.class
                );

        token = (String) response.get("accessToken");
    }

    public String getToken() {
        return token;
    }
}