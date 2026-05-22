package com.dinemaster.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "staff")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Staff {
    @Id
    private String id;

    private String name;
    private String role;
    private String contact;
    private String email;
    private String experience;
    private String joinDate;
    private double salary;
    private String status;
    private int performanceScore;
    private int issuesReported;
    private boolean isEmployeeOfMonth;
    private String nextPaymentDate;
    private String shiftStart;
    private String shiftEnd;
}