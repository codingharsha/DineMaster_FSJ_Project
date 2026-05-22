package com.dinemaster.analytics.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "menu-service", path = "/menu")
public interface MenuClient {
    @GetMapping("/all")
    List<Object> getAllItems();
}