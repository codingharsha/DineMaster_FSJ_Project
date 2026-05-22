package com.dinemaster.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoldReservationRequest {

    private String tableNumber;
    private LocalDate date;
    private LocalTime time;

    private String orderId;

}