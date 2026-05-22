package com.dinemaster.auth.dto;

import com.dinemaster.auth.model.Role;
import lombok.Data;

@Data
public class CreateStaffRequest {
    private String name;
    private String mobileNumber;
    private String email;
    private Role role;
    private String temporaryPassword;
}
