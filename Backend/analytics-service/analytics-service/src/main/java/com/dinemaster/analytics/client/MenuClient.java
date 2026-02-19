package com.dinemaster.analytics.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "menu-service", url = "https://localhost:8081/menu")
public interface MenuClient {
    @GetMapping("/all")
    List<Object> getAllItems();
}
