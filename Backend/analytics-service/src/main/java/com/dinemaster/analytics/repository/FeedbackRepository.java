package com.dinemaster.analytics.repository;

import com.dinemaster.analytics.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    List<Feedback> findBySentiment(String sentiment);
    List<Feedback> findByFlagged(boolean flagged);
    List<Feedback> findByDishName(String dishName);
}