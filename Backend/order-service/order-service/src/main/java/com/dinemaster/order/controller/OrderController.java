package com.dinemaster.order.controller;

import com.dinemaster.order.model.Order;
import com.dinemaster.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "https://localhost:3000")
public class OrderController {

    @Autowired
    public OrderService service;

    @GetMapping("/")
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

    @PostMapping("/place")
    public Order placeOrder(@RequestBody Order order){
        return service.placeOrder(order);
    }

    @GetMapping("/kitchen")
    public List<Order> getKitchenOrders(){
        return service.getKitchenOrders();
    }

    @PutMapping("/update/{id}/{status}")
    public Order updateStatus(@PathVariable String id, @PathVariable String status){
        return service.updateOrderStatus(id, status);
    }

}
