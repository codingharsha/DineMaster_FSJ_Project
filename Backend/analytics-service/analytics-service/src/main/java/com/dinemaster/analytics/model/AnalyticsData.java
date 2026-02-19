package com.dinemaster.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticsData {

    private long totalMenuCount;
    private long totalOrdersCount;
    private long totalReservationsCount;
    private double totalRevenueEstimate;
}
