package com.dinemaster.auth.repository;

import com.dinemaster.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByMobileNumber(String mobileNumber);
    Optional<User> findByEmailIgnoreCase(String email);
    Optional<User> findByMobileNumberOrEmailIgnoreCase(String mobileNumber, String email);
    boolean existsByMobileNumber(String mobileNumber);
    boolean existsByEmailIgnoreCase(String email);
}
