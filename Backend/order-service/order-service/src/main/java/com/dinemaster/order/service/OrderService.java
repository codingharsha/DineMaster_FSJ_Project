package com.dinemaster.order.service;

import com.dinemaster.order.model.Order;
import com.dinemaster.order.model.OrderItem;
import com.dinemaster.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    public OrderRepository repository;

    public Order placeOrder(Order order){
        order.setOrderTime(new Date());
        order.setStatus("PLACED");
        order.setPaymentStatus("PENDING");

        Double total = 0.00;
        if(order.getItems() != null){
            for(OrderItem item: order.getItems()){
                total += item.getPrice() * item.getQuantity();
            }
        }
        order.setTotalAmount(total);
        return repository.save(order);
    }

    public List<Order> getKitchenOrders(){
        return repository.findByStatus("PLACED");
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

}
