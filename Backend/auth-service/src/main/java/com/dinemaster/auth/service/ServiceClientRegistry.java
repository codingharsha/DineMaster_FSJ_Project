package com.dinemaster.auth.service;

import com.dinemaster.auth.model.ServiceClient;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class ServiceClientRegistry {

    private final Map<String, ServiceClient> clients = Map.of(
            "order-service",
            new ServiceClient() {{
                setClientId("order-service");
                setClientSecret("order-secret-123");
                setRole("ROLE_SERVICE");
            }}
    );

    public ServiceClient get(String clientId) {
        return clients.get(clientId);
    }
}