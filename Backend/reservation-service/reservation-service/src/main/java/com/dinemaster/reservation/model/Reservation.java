package com.dinemaster.reservation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "reservations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    private String id;
    private String customerName;
    private String phone;
    private int tableNumber;
    private int numberOfPeople;
    private Date dateTime;
    private String status;
}
