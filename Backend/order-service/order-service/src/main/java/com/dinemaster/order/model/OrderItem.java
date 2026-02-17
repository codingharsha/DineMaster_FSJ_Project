package com.dinemaster.order.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    private String foodItemId;
    private String name;
    private double price;
    private int quantity;
}
