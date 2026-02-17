package com.dinemaster.menu.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "food_items")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodItem {

    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private String category;
    private String imgUrl;
    private boolean isAvailable;
}
