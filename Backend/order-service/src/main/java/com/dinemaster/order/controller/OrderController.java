package com.dinemaster.order.controller;

import com.dinemaster.order.dto.CreateOrderRequest;
import com.dinemaster.order.dto.PaymentResponse;
import com.dinemaster.order.model.Order;
import com.dinemaster.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    public OrderService service;

    @GetMapping
    public List<Order> getAllOrders(){
        return service.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable String id){
        return service.getOrderById(id).orElseThrow(()-> new RuntimeException("No Orders found!"));
    }

    @GetMapping("/table/{tableNumber}")
    public List<Order> getOrdersByTable(@PathVariable int tableNumber){
        return service.getOrdersByTable(tableNumber);
    }

    @PostMapping
    public Order placeOrder(@RequestBody CreateOrderRequest request) {
        return service.placeOrder(request);
    }

    @GetMapping("/kitchen")
    public List<Order> getKitchenOrders(){
        return service.getKitchenOrders();
    }

    @PutMapping("/update/{id}/{status}")
    public Order updateStatus(@PathVariable String id, @PathVariable String status){
        return service.updateOrderStatus(id, status);
    }

    @PostMapping("/place-and-pay")
    public ResponseEntity<PaymentResponse> placeAndPay(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(service.placeAndPay(body));
    }
}
