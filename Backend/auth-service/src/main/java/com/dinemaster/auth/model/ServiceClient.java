package com.dinemaster.auth.model;

import lombok.Data;

@Data
public class ServiceClient {
    private String clientId;
    private String clientSecret;
    private String role;
}