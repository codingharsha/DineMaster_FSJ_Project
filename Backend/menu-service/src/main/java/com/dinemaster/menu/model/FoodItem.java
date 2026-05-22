package com.dinemaster.menu.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonAlias("_id")
    private String id;
    private String name;
    private String description;
    private Double price;
    private String category;
    @JsonAlias("image")
    private String imgUrl;
    private Double rating;
    @JsonAlias("veg")
    private boolean isVeg;
    private boolean isAvailable = true;

    @JsonProperty("_id")
    public String get_id() {
        return id;
    }

    @JsonProperty("image")
    public String getImage() {
        return imgUrl;
    }

    @JsonProperty("veg")
    public boolean getVeg() {
        return isVeg;
    }
}
