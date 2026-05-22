package com.dinemaster.auth.config;

import com.dinemaster.auth.model.Role;
import com.dinemaster.auth.model.User;
import com.dinemaster.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminBootstrapConfig {

    @Bean
    @ConditionalOnProperty(name = "auth.bootstrap.admin.enabled", havingValue = "true")
    CommandLineRunner bootstrapAdminUser(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            String email = "admin@dinemaster.com";
            String rawPassword = "Temp@123";

            User admin = userRepository.findByEmailIgnoreCase(email).orElseGet(User::new);
            admin.setEmail(email);
            if (admin.getName() == null || admin.getName().isBlank()) {
                admin.setName("Default Admin");
            }
            if (admin.getMobileNumber() == null || admin.getMobileNumber().isBlank()) {
                admin.setMobileNumber("9999999999");
            }
            admin.setRole(Role.ADMIN);
            admin.setPasswordHash(passwordEncoder.encode(rawPassword));
            admin.setPasswordChangeRequired(true);

            userRepository.save(admin);

            System.out.println("[Auth Bootstrap] Admin account ready:");
            System.out.println("[Auth Bootstrap] email=admin@dinemaster.com password=Temp@123");
        };
    }
}
