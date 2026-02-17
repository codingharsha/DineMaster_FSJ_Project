package com.dinemaster.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@Document(collection = "analytics")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Analytics {
    @Id
    private String id;

    @Indexed(unique = true)
    private String periodId;

    private String type;

    private double totalRevenue;
    private int totalOrders;

    private Map<String, Integer> itemSales = new HashMap<>();
}

