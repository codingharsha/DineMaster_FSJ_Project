package com.dinemaster.auth.dto;

import com.dinemaster.auth.model.Role;
import lombok.Data;

@Data
public class UpdateUserRoleByMobileRequest {
    private String mobileNumber;
    private Role role;
}
