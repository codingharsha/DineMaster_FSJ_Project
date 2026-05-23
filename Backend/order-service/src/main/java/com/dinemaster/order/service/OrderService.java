package com.dinemaster.order.service;

import com.dinemaster.order.dto.CreateOrderRequest;
import com.dinemaster.order.dto.PaymentRequest;
import com.dinemaster.order.dto.PaymentResponse;
import com.dinemaster.order.model.Order;
import com.dinemaster.order.model.OrderItem;
import com.dinemaster.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    public OrderRepository repository;

    public Order placeOrder(CreateOrderRequest request) {

        Order order = new Order();

        order.setTableNumber(request.getTableNumber());
        order.setOrderTime(new Date());
        order.setStatus("PLACED");
        order.setPaymentStatus("PENDING");

        long reservationFee = 50 * 100;
        order.setTotalAmount(reservationFee);

        return repository.save(order);
    }

    public List<Order> getKitchenOrders(){
        return repository.findByStatusIn(List.of(
                "PLACED",
                "COOKING",
                "READY",
                "DELIVERED",
                "CANCELLED",
                "REJECTED"
        ));
    }

    public List<Order> getOrdersByTable(int tableNumber){
        return repository.findByTableNumber(tableNumber);
    }

    public List<Order> getAllOrders(){
        return repository.findAll();
    }

    public Optional<Order> getOrderById(String id){
        return repository.findById(id);
    }

    public Order updateOrderStatus(String id, String newStatus){
        return repository.findById(id).map(order -> {
            order.setStatus(newStatus);
            return repository.save(order);
        }).orElseThrow(() -> new RuntimeException("No Order Found!"));
    }

    @Autowired
    private RestTemplate restTemplate;

    public PaymentResponse placeOrderAndCreatePayment(Order order) {

        CreateOrderRequest request = new CreateOrderRequest();
        request.setTableNumber(order.getTableNumber());

        Order savedOrder = placeOrder(request);

        PaymentRequest paymentRequest = new PaymentRequest();
        paymentRequest.setOrderId(savedOrder.getId());
        paymentRequest.setAmount(savedOrder.getTotalAmount());
        paymentRequest.setCurrency("INR");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<PaymentRequest> entity =
                new HttpEntity<>(paymentRequest, headers);

        ResponseEntity<PaymentResponse> response =
                restTemplate.postForEntity(
                        "http://localhost:8085/payment/create",
                        entity,
                        PaymentResponse.class
                );

        return response.getBody();
    }

    public PaymentResponse placeAndPay(Map<String, Object> body) {
        Order order = new Order();

        Object tableNumberRaw = body.get("tableNumber");
        int tableNumber = 0;
        if (tableNumberRaw instanceof Number number) {
            tableNumber = number.intValue();
        } else if (tableNumberRaw instanceof String str) {
            String digits = str.replaceAll("\\D+", "");
            if (!digits.isBlank()) {
                tableNumber = Integer.parseInt(digits);
            }
        }
        order.setTableNumber(tableNumber);

        List<OrderItem> mappedItems = new java.util.ArrayList<>();
        int totalQty = 0;
        Object itemsRaw = body.get("items");
        if (itemsRaw instanceof List<?> items) {
            for (Object itemObj : items) {
                if (!(itemObj instanceof Map<?, ?> itemMap)) continue;
                OrderItem orderItem = new OrderItem();
                Object foodId = itemMap.get("foodId");
                Object quantity = itemMap.get("quantity");
                orderItem.setFoodItemId(foodId != null ? foodId.toString() : null);
                int qty = quantity instanceof Number num ? num.intValue() : 0;
                orderItem.setQuantity(Math.max(qty, 0));
                mappedItems.add(orderItem);
                totalQty += Math.max(qty, 0);
            }
        }

        order.setItems(mappedItems);
        order.setOrderTime(new Date());
        order.setStatus("PLACED");
        order.setPaymentStatus("PENDING");

        long reservationFeePaise = 50L * 100L;
        long itemCostPaise = totalQty * 200L * 100L;
        long finalAmount = reservationFeePaise + itemCostPaise;
        order.setTotalAmount(finalAmount);

        Order savedOrder = repository.save(order);

        PaymentRequest paymentRequest = new PaymentRequest(
                savedOrder.getId(),
                savedOrder.getTotalAmount(),
                "INR"
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<PaymentRequest> entity = new HttpEntity<>(paymentRequest, headers);

        ResponseEntity<PaymentResponse> response = restTemplate.postForEntity(
                "http://localhost:8085/payment/create",
                entity,
                PaymentResponse.class
        );

        return response.getBody();
    }

}
