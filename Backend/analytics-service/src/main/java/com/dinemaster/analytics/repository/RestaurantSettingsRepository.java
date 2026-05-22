package com.dinemaster.analytics.repository;

import com.dinemaster.analytics.model.RestaurantSettings;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantSettingsRepository extends MongoRepository<RestaurantSettings, String> {
}