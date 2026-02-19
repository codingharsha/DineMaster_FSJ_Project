package com.dinemaster.analytics.client;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "order-service", url = "http://localhost:8082/order")
public interface OrderClient {

    @GetMapping("/all")
    List<Object> getAllOrders();
}
