package com.dinemaster.analytics.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "order-service", path = "/orders")
public interface OrderClient {

    @GetMapping
    List<Object> getAllOrders();
}
