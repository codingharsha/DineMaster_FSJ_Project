package com.dinemaster.auth.controller;

import com.dinemaster.auth.dto.AuthResponse;
import com.dinemaster.auth.dto.LoginRequest;
import com.dinemaster.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> request) {
        return service.sendOtp(request.get("mobile"));
    }


    @PostMapping("/verify-otp")
    public AuthResponse verifyOtp(@RequestBody LoginRequest request) {
        return service.verifyOtp(request.getMobile(), request.getOtp(), request.getName());
    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "If you see this, you are authenticated!";
    }
}