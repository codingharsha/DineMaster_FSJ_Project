package com.dinemaster.auth.service;

import com.dinemaster.auth.model.User;
import com.dinemaster.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        User user;
        if (identifier != null && identifier.contains("@")) {
            user = repository.findByEmailIgnoreCase(identifier.toLowerCase())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + identifier));
        } else {
            user = repository.findByMobileNumber(identifier == null ? "" : identifier.replaceAll("\\D", ""))
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with mobile: " + identifier));
        }

        return new org.springframework.security.core.userdetails.User(
                identifier,
                user.getPasswordHash() == null ? "" : user.getPasswordHash(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
    }
}
