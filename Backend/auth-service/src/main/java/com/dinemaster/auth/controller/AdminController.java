package com.dinemaster.auth.controller;

import com.dinemaster.auth.model.Role;
import com.dinemaster.auth.model.User;
import com.dinemaster.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    private UserRepository repository;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return repository.findAll();
    }

    @PutMapping("/users/{id}/role")
    public User updateUserRole(@PathVariable Long id, @RequestParam Role role){
        User user = repository.findById(id).orElseThrow(()-> new RuntimeException("User Not Found!"));
        user.setRole(role);
        return repository.save(user);

    }
}
