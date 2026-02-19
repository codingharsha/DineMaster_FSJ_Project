package com.dinemaster.auth.service;

import com.dinemaster.auth.dto.AuthResponse;
import com.dinemaster.auth.model.User;
import com.dinemaster.auth.repository.UserRepository;
import com.dinemaster.auth.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private OtpService otpService;

    @Autowired
    private JwtUtil jwtUtil;

    public String sendOtp(String mobile) {
        return otpService.generateOtp(mobile);
    }

    public AuthResponse verifyOtp(String mobile, String otp, String name) {

        boolean isValid = otpService.validateOtp(mobile, otp);
        if (!isValid) {
            throw new RuntimeException("Invalid OTP");
        }

        Optional<User> existingUser = repository.findByMobileNumber(mobile);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            String token = jwtUtil.generateToken(mobile);
            return new AuthResponse(token, user.getName(), user.getRole(), "Login Successful");

        } else {
            if (name == null || name.isEmpty()) {
                return new AuthResponse(null, null, null, "NEW_USER_REQUIRED");
            }

            User newUser = new User();
            newUser.setMobileNumber(mobile);
            newUser.setName(name);
            newUser.setRole("USER");

            User savedUser = repository.save(newUser);

            String token = jwtUtil.generateToken(mobile);
            return new AuthResponse(token, savedUser.getName(), savedUser.getRole(), "Login Successful");
        }
    }
}