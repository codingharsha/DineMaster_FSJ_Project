package com.dinemaster.reservation.dto;

public class ConfirmReservationRequest {

    private String reservationId;
    private String orderId;

    public ConfirmReservationRequest() {}

    public ConfirmReservationRequest(String reservationId, String orderId) {
        this.reservationId = reservationId;
        this.orderId = orderId;
    }

    public String getReservationId() {
        return reservationId;
    }

    public void setReservationId(String reservationId) {
        this.reservationId = reservationId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
}