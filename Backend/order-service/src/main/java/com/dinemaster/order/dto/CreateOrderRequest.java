package com.dinemaster.order.dto;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private int tableNumber;
    private String date;
    private String time;
}