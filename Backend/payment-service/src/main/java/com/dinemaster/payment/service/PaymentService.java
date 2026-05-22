package com.dinemaster.payment.service;

import com.dinemaster.payment.dto.CreatePaymentRequest;
import com.dinemaster.payment.dto.CreatePaymentResponse;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final RazorpayClient razorpayClient;

    @Value("${razorpay.key-id}")
    private String keyId;

    public PaymentService(RazorpayClient razorpayClient) {
        this.razorpayClient = razorpayClient;
    }

    public CreatePaymentResponse createPaymentOrder(CreatePaymentRequest request) {

        try {
            JSONObject options = new JSONObject();
            options.put("amount", request.getAmount()); // paise
            options.put("currency", request.getCurrency());
            options.put("receipt", request.getOrderId());

            Order order = razorpayClient.orders.create(options);

            return new CreatePaymentResponse(
                    order.get("id"),
                    request.getAmount(),
                    request.getCurrency(),
                    keyId
            );

        } catch (Exception e) {
            throw new RuntimeException("Failed to create Razorpay order", e);
        }
    }
}