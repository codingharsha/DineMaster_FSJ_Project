package com.dinemaster.order.config;

import com.dinemaster.order.security.ServiceTokenManager;
import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor serviceAuthInterceptor(
            ServiceTokenManager tokenManager
    ) {
        return requestTemplate -> {
            String token = tokenManager.getToken();
            if (token != null && !token.isBlank()) {
                requestTemplate.header(
                        "Authorization",
                        "Bearer " + token
                );
            }
        };
    }
}
