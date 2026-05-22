package com.dinemaster.auth.controller;

import com.dinemaster.auth.dto.CreateStaffRequest;
import com.dinemaster.auth.model.User;
import com.dinemaster.auth.repository.UserRepository;
import com.dinemaster.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/users")
public class AdminController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private AuthService authService;

    @GetMapping
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @PostMapping("/create-staff")
    public ResponseEntity<?> createStaffAccount(@RequestBody CreateStaffRequest request) {
        try {
            User created = authService.createStaffAccount(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage()));
        }
    }
}
