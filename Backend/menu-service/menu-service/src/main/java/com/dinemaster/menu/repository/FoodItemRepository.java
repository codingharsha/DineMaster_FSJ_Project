package com.dinemaster.menu.repository;

import com.dinemaster.menu.model.FoodItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemRepository extends MongoRepository<FoodItem, String> {
    List<FoodItem> findByCategory(String category);

    List<FoodItem> findByIsAvailableTrue();
}
