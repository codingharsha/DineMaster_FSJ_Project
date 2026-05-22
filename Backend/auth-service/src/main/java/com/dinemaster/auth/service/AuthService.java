package com.dinemaster.auth.service;

import com.dinemaster.auth.dto.AuthResponse;
import com.dinemaster.auth.dto.CheckIdentityResponse;
import com.dinemaster.auth.dto.CreateStaffRequest;
import com.dinemaster.auth.model.Role;
import com.dinemaster.auth.model.User;
import com.dinemaster.auth.repository.UserRepository;
import com.dinemaster.auth.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CheckIdentityResponse checkIdentity(String identifier) {
        String normalized = normalizeIdentifier(identifier);
        if (normalized.isBlank()) {
            throw new RuntimeException("Identifier is required");
        }

        Optional<User> existingUser = findByIdentifier(normalized);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getRole() == Role.ADMIN || user.getRole() == Role.KITCHEN_STAFF) {
                return new CheckIdentityResponse("PASSWORD", false);
            }
            otpService.generateOtp(normalized);
            return new CheckIdentityResponse("OTP", false);
        }

        otpService.generateOtp(normalized);
        return new CheckIdentityResponse("OTP", true);
    }

    public AuthResponse verifyOtp(String identifier, String otp, String name) {
        String normalized = normalizeIdentifier(identifier);
        boolean isValid = otpService.validateOtp(normalized, otp);
        if (!isValid) {
            throw new RuntimeException("Invalid OTP");
        }

        Optional<User> existingUser = findByIdentifier(normalized);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getRole() != Role.CUSTOMER) {
                throw new RuntimeException("Use password login for staff/admin accounts");
            }
            String token = jwtUtil.generateToken(resolveTokenSubject(user), user.getRole());
            return new AuthResponse(token, user.getName(), user.getRole(), "Login Successful", false);

        } else {
            if (name == null || name.isEmpty()) {
                return new AuthResponse(null, null, null, "NEW_USER_REQUIRED", false);
            }

            User newUser = new User();
            newUser.setName(name);
            newUser.setRole(Role.CUSTOMER);
            newUser.setPasswordChangeRequired(false);
            assignIdentifier(newUser, normalized);

            User savedUser = repository.save(newUser);

            String token = jwtUtil.generateToken(resolveTokenSubject(savedUser), savedUser.getRole());
            return new AuthResponse(token, savedUser.getName(), savedUser.getRole(), "Login Successful", false);
        }
    }

    public User createStaffAccount(CreateStaffRequest request) {
        if (request == null) {
            throw new RuntimeException("Invalid request");
        }

        String email = request.getEmail() == null ? null : request.getEmail().trim().toLowerCase();
        if (email == null || email.isBlank()) {
            throw new RuntimeException("Work email is required");
        }

        if (request.getTemporaryPassword() == null || request.getTemporaryPassword().trim().length() < 6) {
            throw new RuntimeException("Temporary password must be at least 6 characters");
        }

        Role role = request.getRole();
        if (role == null) {
            throw new RuntimeException("Role is required");
        }
        if (role != Role.KITCHEN_STAFF && role != Role.ADMIN) {
            throw new RuntimeException("Only ADMIN or KITCHEN_STAFF can be created from this endpoint");
        }

        if (repository.existsByEmailIgnoreCase(email)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName() == null ? "" : request.getName().trim());
        if (request.getMobileNumber() != null && !request.getMobileNumber().isBlank()) {
            String mobileNumber = normalizePhone(request.getMobileNumber());
            if (repository.existsByMobileNumber(mobileNumber)) {
                throw new RuntimeException("Mobile number already exists");
            }
            user.setMobileNumber(mobileNumber);
        }
        user.setEmail(email);
        user.setRole(role);
        user.setPasswordHash(passwordEncoder.encode(request.getTemporaryPassword().trim()));
        user.setPasswordChangeRequired(true);
        return repository.save(user);
    }

    public AuthResponse loginWithPassword(String identifier, String password) {
        if (identifier == null || identifier.isBlank() || password == null || password.isBlank()) {
            throw new RuntimeException("Identifier and password are required");
        }

        String normalizedIdentifier = normalizeIdentifier(identifier);
        Optional<User> userOpt = findByIdentifier(normalizedIdentifier);
        User user = userOpt.orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (user.getRole() == Role.CUSTOMER) {
            throw new RuntimeException("Customers must use OTP login");
        }
        if (user.getPasswordHash() == null || user.getPasswordHash().isBlank()) {
            throw new RuntimeException("Password login is not enabled for this account");
        }
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(resolveTokenSubject(user), user.getRole());
        String message = user.isPasswordChangeRequired()
                ? "Password change required before continuing"
                : "Login Successful";

        return new AuthResponse(token, user.getName(), user.getRole(), message, user.isPasswordChangeRequired());
    }

    public void changePasswordOnFirstLogin(String mobileNumberFromToken, String currentPassword, String newPassword) {
        if (newPassword == null || newPassword.trim().length() < 6) {
            throw new RuntimeException("New password must be at least 6 characters");
        }

        User user = findByIdentifier(mobileNumberFromToken)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getPasswordHash() == null || user.getPasswordHash().isBlank()) {
            throw new RuntimeException("Password login is not enabled for this account");
        }
        if (currentPassword == null || !passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword.trim()));
        user.setPasswordChangeRequired(false);
        repository.save(user);
    }

    private Optional<User> findByIdentifier(String identifier) {
        if (identifier == null || identifier.isBlank()) {
            return Optional.empty();
        }
        if (isEmail(identifier)) {
            return repository.findByEmailIgnoreCase(identifier);
        }
        return repository.findByMobileNumber(normalizePhone(identifier));
    }

    private void assignIdentifier(User user, String identifier) {
        if (isEmail(identifier)) {
            user.setEmail(identifier);
        } else {
            user.setMobileNumber(normalizePhone(identifier));
        }
    }

    private String resolveTokenSubject(User user) {
        if (user.getEmail() != null && !user.getEmail().isBlank()) {
            return user.getEmail().trim().toLowerCase();
        }
        if (user.getMobileNumber() != null && !user.getMobileNumber().isBlank()) {
            return normalizePhone(user.getMobileNumber());
        }
        throw new RuntimeException("User has no valid login identifier");
    }

    private String normalizeIdentifier(String identifier) {
        if (identifier == null) {
            return "";
        }
        String trimmed = identifier.trim();
        if (isEmail(trimmed)) {
            return trimmed.toLowerCase();
        }
        return normalizePhone(trimmed);
    }

    private String normalizePhone(String phone) {
        return phone == null ? "" : phone.replaceAll("\\D", "");
    }

    private boolean isEmail(String value) {
        return value != null && value.contains("@");
    }
}
