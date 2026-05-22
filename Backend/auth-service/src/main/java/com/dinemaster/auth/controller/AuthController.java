package com.dinemaster.auth.controller;

import com.dinemaster.auth.dto.AuthResponse;
import com.dinemaster.auth.dto.CheckIdentityRequest;
import com.dinemaster.auth.dto.CheckIdentityResponse;
import com.dinemaster.auth.dto.ChangePasswordRequest;
import com.dinemaster.auth.dto.LoginRequest;
import com.dinemaster.auth.dto.PasswordLoginRequest;
import com.dinemaster.auth.service.AuthService;
import com.dinemaster.auth.service.OtpService;
import com.dinemaster.auth.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private OtpService otpService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/check-identity")
    public ResponseEntity<?> checkIdentity(@RequestBody CheckIdentityRequest request) {
        try {
            CheckIdentityResponse response = service.checkIdentity(request.getIdentifier());
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> body) {

        otpService.generateOtp(body.get("identifier"));

        return ResponseEntity.ok("OTP sent");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(service.verifyOtp(request.getIdentifier(), request.getOtp(), request.getName()));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/login-password")
    public ResponseEntity<?> loginWithPassword(@RequestBody PasswordLoginRequest request) {
        try {
            AuthResponse response = service.loginWithPassword(request.getIdentifier(), request.getPassword());
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/password/change-first")
    public ResponseEntity<?> changePasswordOnFirstLogin(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ChangePasswordRequest request
    ) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Missing bearer token"));
            }
            String token = authHeader.substring(7);
            String mobile = jwtUtil.extractUsername(token);
            service.changePasswordOnFirstLogin(mobile, request.getCurrentPassword(), request.getNewPassword());
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage()));
        }
    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "If you see this, you are authenticated!";
    }
}
