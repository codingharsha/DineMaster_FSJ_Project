package com.dinemaster.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckIdentityResponse {
    private String authMethod; // OTP or PASSWORD
    private boolean newUser;
}
