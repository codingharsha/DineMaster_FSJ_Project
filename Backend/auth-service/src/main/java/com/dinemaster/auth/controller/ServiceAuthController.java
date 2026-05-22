package com.dinemaster.auth.controller;

import com.dinemaster.auth.dto.ServiceTokenRequest;
import com.dinemaster.auth.dto.TokenResponse;
import com.dinemaster.auth.model.ServiceClient;
import com.dinemaster.auth.service.ServiceClientRegistry;
import com.dinemaster.auth.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/service")
public class ServiceAuthController {

    private final ServiceClientRegistry registry;
    private final JwtUtil jwtUtil;

    public ServiceAuthController(ServiceClientRegistry registry, JwtUtil jwtUtil) {
        this.registry = registry;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/token")
    public TokenResponse getToken(@RequestBody ServiceTokenRequest request) {

        ServiceClient client = registry.get(request.getClientId());

        if (client == null ||
                !client.getClientSecret().equals(request.getClientSecret())) {
            throw new RuntimeException("Invalid service credentials");
        }

        String token = jwtUtil.generateServiceToken(
                client.getClientId()
        );

        return new TokenResponse(token);
    }
}