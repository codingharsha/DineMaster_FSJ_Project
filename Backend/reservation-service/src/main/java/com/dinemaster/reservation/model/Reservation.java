package com.dinemaster.reservation.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Instant;

@Document(collection = "reservations")
@CompoundIndex(
        name = "table_date_time_status_idx",
        def = "{'tableNumber':1, 'date':1, 'time':1, 'status':1}"
)
@Data
public class Reservation {

    @Id
    private String reservationId;

    private String userId;
    private String orderId;
    private String tableNumber;
    private LocalDate date;
    private LocalTime time;
    private ReservationStatus status;
    private Instant createdAt;
    private Instant expiresAt;

}