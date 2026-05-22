package com.dinemaster.payment.controller;

import com.dinemaster.payment.dto.CreatePaymentRequest;
import com.dinemaster.payment.dto.CreatePaymentResponse;
import com.dinemaster.payment.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create")
    public CreatePaymentResponse createPayment(
            @RequestBody @Valid CreatePaymentRequest request
    ) {
        return paymentService.createPaymentOrder(request);
    }
}