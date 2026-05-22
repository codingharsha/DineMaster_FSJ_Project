package com.dinemaster.reservation.controller;

import com.dinemaster.reservation.dto.HoldReservationRequest;
import com.dinemaster.reservation.dto.ReservationRequest;
import com.dinemaster.reservation.dto.ReservationResponse;
import com.dinemaster.reservation.model.Reservation;
import com.dinemaster.reservation.service.ReservationService;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createReservation(
            @RequestBody ReservationRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();

        String reservationId = reservationService.createReservation(
                userId,
                request.getDate(),
                request.getTime(),
                request.getGuests(),
                request.getTableLabel()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("reservationId", reservationId);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/hold")
    public ReservationResponse hold(
            @RequestBody HoldReservationRequest req,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();

        Reservation reservation = reservationService.holdForCustomer(req, userId);

        return new ReservationResponse(
                reservation.getReservationId(),
                reservation.getTableNumber(),
                reservation.getStatus().name(),
                reservation.getExpiresAt()
        );
    }

    @PostMapping("/cancel/{reservationId}")
    public void cancel(
            @PathVariable String reservationId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        reservationService.cancelByCustomer(
                reservationId,
                jwt.getSubject()
        );
    }

    @GetMapping("/all")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @PostConstruct
    public void init() {
        System.out.println("ReservationController loaded");
    }
}
