package com.dinemaster.reservation.dto;

import lombok.Data;

@Data
public class ReservationRequest {
    private String date;
    private String time;
    private int guests;
    private String tableLabel;

}