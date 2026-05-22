package com.dinemaster.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {

    private String reservationId;
    private String tableNumber;
    private String status;
    private Instant expiresAt;

}