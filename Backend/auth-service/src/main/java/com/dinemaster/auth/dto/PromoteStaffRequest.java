package com.dinemaster.auth.dto;

import lombok.Data;

@Data
public class PromoteStaffRequest {
    private String customerPhoneNumber;
    private String staffEmail;
    private String temporaryPassword;
}
