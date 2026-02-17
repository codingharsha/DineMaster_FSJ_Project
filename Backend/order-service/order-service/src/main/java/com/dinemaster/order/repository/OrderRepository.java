package com.dinemaster.order.repository;

import com.dinemaster.order.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String>{
    List<Order> findByTableNumber(int tableNumber);
    List<Order> findByStatus(String status);
}
