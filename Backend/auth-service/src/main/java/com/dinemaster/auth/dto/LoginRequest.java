package com.dinemaster.auth.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String identifier;
    private String otp;
    private String name;
}
