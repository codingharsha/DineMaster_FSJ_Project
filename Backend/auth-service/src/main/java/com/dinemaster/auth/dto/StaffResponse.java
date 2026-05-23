package com.dinemaster.auth.dto;

import com.dinemaster.auth.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StaffResponse {
    private Long id;
    private String name;
    private String email;
    private String mobileNumber;
    private Role role;
    private boolean passwordChangeRequired;
}
