package com.dinemaster.analytics.service;

import com.dinemaster.analytics.client.MenuClient;
import com.dinemaster.analytics.client.OrderClient;
import com.dinemaster.analytics.client.ReservationClient;
import com.dinemaster.analytics.model.AnalyticsData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {

    @Autowired private MenuClient menuClient;
    @Autowired private OrderClient orderClient;
    @Autowired private ReservationClient reservationClient;

    public AnalyticsData getDashboardStats() {
        List<Object> menuItems = menuClient.getAllItems();
        List<Object> orders = orderClient.getAllOrders();
        List<Object> reservations = reservationClient.getAllReservations();

        AnalyticsData data = new AnalyticsData();
        data.setTotalMenuCount(menuItems.size());
        data.setTotalOrdersCount(orders.size());
        data.setTotalReservationsCount(reservations != null ? reservations.size() : 0);

        data.setTotalRevenueEstimate(orders.size() * 250.0);

        return data;
    }
}