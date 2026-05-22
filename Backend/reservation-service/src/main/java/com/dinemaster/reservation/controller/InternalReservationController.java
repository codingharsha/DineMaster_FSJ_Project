package com.dinemaster.reservation.controller;

import com.dinemaster.reservation.dto.ConfirmReservationRequest;
import com.dinemaster.reservation.dto.HoldReservationRequest;
import com.dinemaster.reservation.dto.ReleaseReservationRequest;
import com.dinemaster.reservation.dto.ReservationResponse;
import com.dinemaster.reservation.model.Reservation;
import com.dinemaster.reservation.service.ReservationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal/reservations")
public class InternalReservationController {

    private final ReservationService reservationService;

    public InternalReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/hold")
    public ReservationResponse holdInternal(
            @RequestBody HoldReservationRequest req) {

        Reservation reservation =
                reservationService.holdForOrder(req, req.getOrderId());

        return new ReservationResponse(
                reservation.getReservationId(),
                reservation.getTableNumber(),
                reservation.getStatus().name(),
                reservation.getExpiresAt()
        );
    }

    @PostMapping("/confirm")
    public void confirm(@RequestBody ConfirmReservationRequest request) {
        reservationService.confirm(
                request.getReservationId(),
                request.getOrderId()
        );
    }

    @PostMapping("/release")
    public void release(@RequestBody ReleaseReservationRequest request) {
        reservationService.release(
                request.getReservationId(),
                request.getOrderId()
        );
    }
}