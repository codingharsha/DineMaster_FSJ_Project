package com.dinemaster.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Document(collection = "sales_reports")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesReport {
    @Id
    private String id;

    private LocalDate date;
    private String period;           // DAILY / WEEKLY / MONTHLY
    private double totalRevenue;
    private int totalOrders;
    private int totalCovers;         // number of customers served
    private double avgOrderValue;
    private Map<String, Integer> topDishes;   // dishName -> unitsSold
    private Map<String, Double> revenueByCategory;
    private List<Double> hourlyRevenue;  // 24 slots
}