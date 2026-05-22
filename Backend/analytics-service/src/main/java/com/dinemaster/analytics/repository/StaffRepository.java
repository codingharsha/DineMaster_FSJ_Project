package com.dinemaster.analytics.repository;

import com.dinemaster.analytics.model.Staff;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface StaffRepository extends MongoRepository<Staff, String> {
    List<Staff> findByStatus(String status);
    Optional<Staff> findByIsEmployeeOfMonthTrue();
}