package com.dinemaster.order.config;

import com.dinemaster.order.model.Order;
import com.dinemaster.order.model.OrderItem;
import com.dinemaster.order.repository.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;
import java.util.List;

@Configuration
public class KitchenOrderSeedConfig {

    @Bean
    @ConditionalOnProperty(name = "orders.seed.kitchen.enabled", havingValue = "true", matchIfMissing = true)
    CommandLineRunner seedKitchenOrders(OrderRepository repository) {
        return args -> {
            List<Order> active = repository.findByStatusIn(List.of("PLACED", "COOKING", "READY"));
            if (!active.isEmpty()) {
                return;
            }

            Order placed = new Order();
            placed.setCustomerName("Arjun Nair");
            placed.setTableNumber(4);
            placed.setStatus("PLACED");
            placed.setOrderTime(new Date(System.currentTimeMillis() - 8 * 60 * 1000));
            placed.setPaymentStatus("PENDING");
            placed.setTotalAmount(1200L);
            placed.setItems(List.of(
                    new OrderItem("F-101", "Paneer Tikka", 450.0, 1),
                    new OrderItem("F-204", "Butter Naan", 90.0, 3),
                    new OrderItem("F-304", "Mango Lassi", 160.0, 1)
            ));

            Order cooking = new Order();
            cooking.setCustomerName("Maya Joseph");
            cooking.setTableNumber(7);
            cooking.setStatus("COOKING");
            cooking.setOrderTime(new Date(System.currentTimeMillis() - 14 * 60 * 1000));
            cooking.setPaymentStatus("PENDING");
            cooking.setTotalAmount(1850L);
            cooking.setItems(List.of(
                    new OrderItem("F-110", "Chicken Biryani", 650.0, 2),
                    new OrderItem("F-401", "Mineral Water", 55.0, 1)
            ));

            Order ready = new Order();
            ready.setCustomerName("Delivery Partner - Ravi");
            ready.setTableNumber(0);
            ready.setStatus("READY");
            ready.setOrderTime(new Date(System.currentTimeMillis() - 18 * 60 * 1000));
            ready.setPaymentStatus("PAID");
            ready.setTotalAmount(990L);
            ready.setItems(List.of(
                    new OrderItem("F-509", "Margherita Pizza", 520.0, 1),
                    new OrderItem("F-612", "Fries", 220.0, 1),
                    new OrderItem("F-701", "Cold Coffee", 250.0, 1)
            ));

            repository.saveAll(List.of(placed, cooking, ready));
            System.out.println("[Order Seed] Inserted kitchen demo orders (PLACED/COOKING/READY).");
        };
    }
}
