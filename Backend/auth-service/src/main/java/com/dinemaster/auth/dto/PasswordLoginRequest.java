package com.dinemaster.auth.dto;

import lombok.Data;

@Data
public class PasswordLoginRequest {
    private String identifier;
    private String password;
}
