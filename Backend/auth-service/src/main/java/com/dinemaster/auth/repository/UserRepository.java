package com.dinemaster.auth.repository;

import com.dinemaster.auth.model.User;
import com.dinemaster.auth.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByRole(Role role);
    Optional<User> findByMobileNumber(String mobileNumber);
    Optional<User> findByEmailIgnoreCase(String email);
    Optional<User> findByMobileNumberOrEmailIgnoreCase(String mobileNumber, String email);
    boolean existsByMobileNumberAndRole(String mobileNumber, Role role);
    boolean existsByMobileNumber(String mobileNumber);
    boolean existsByEmailIgnoreCase(String email);
}
