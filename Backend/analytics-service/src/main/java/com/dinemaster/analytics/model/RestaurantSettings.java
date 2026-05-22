package com.dinemaster.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "restaurant_settings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantSettings {
    @Id
    private String id;

    private String restaurantName;
    private String contactPhone;
    private String address;
    private String currentStatus;
    private double taxRate;
    private double serviceCharge;
    private String currency;
    private String weekdayOpen;
    private String weekdayClose;
    private String weekendOpen;
    private String weekendClose;
}