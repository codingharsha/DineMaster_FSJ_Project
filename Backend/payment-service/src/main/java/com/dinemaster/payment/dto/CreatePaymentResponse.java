package com.dinemaster.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreatePaymentResponse {

    private String razorpayOrderId;
    private Long amount;
    private String currency;
    private String key;
}