package com.dinemaster.order.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    private String id;

    private String customerName;
    private int tableNumber;
    private List<OrderItem> items;
    private double totalAmount;
    private String status;
    private Date orderTime;
    private String paymentStatus;
    private String transactionId;
}
