package com.dinemaster.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "feedback")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {
    @Id
    private String id;

    private String customerName;
    private String customerPhone;
    private String dishName;
    private int dishRating;
    private int serviceRating;
    private String comment;
    private String sentiment;
    private boolean flagged;
    private String adminReply;
    private LocalDateTime createdAt;
}