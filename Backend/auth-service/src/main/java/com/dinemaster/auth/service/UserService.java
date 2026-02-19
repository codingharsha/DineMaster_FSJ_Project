package com.dinemaster.auth.service;

import com.dinemaster.auth.model.User;
import com.dinemaster.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    public UserRepository repository;

    public User addUser(User user){
        return repository.save(user);
    }

    public User getUserById(Long id){
        return repository.findById(id).orElseThrow(()-> new RuntimeException("No User found!"));
    }
}
