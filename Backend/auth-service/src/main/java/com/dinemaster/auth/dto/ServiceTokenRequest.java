package com.dinemaster.auth.dto;

import lombok.Data;

@Data
public class ServiceTokenRequest {
    private String clientId;
    private String clientSecret;
}