package com.dinemaster.order.dto;

import lombok.Data;

@Data
public class PaymentResponse {
    private String razorpayOrderId;
    private Long amount;
    private String currency;
    private String key;
}