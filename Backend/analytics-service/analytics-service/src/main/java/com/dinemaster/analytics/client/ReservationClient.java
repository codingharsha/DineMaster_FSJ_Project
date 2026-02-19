package com.dinemaster.analytics.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "reservation-service", url = "https://localhost:8083/reservation/")
public interface ReservationClient {
    @GetMapping("/all")
    List<Object> getAllReservations();
}
