package com.dinemaster.reservation.service;

import com.dinemaster.reservation.dto.HoldReservationRequest;
import com.dinemaster.reservation.model.Reservation;
import com.dinemaster.reservation.model.ReservationStatus;
import com.dinemaster.reservation.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepo;

    public ReservationService(ReservationRepository reservationRepo) {
        this.reservationRepo = reservationRepo;
    }


    public Reservation holdForCustomer(
            HoldReservationRequest req,
            String userId
    ) {
        validateAvailability(req);

        Reservation reservation = new Reservation();
        reservation.setUserId(userId);
        reservation.setTableNumber(req.getTableNumber());
        reservation.setDate(req.getDate());
        reservation.setTime(req.getTime());
        reservation.setStatus(ReservationStatus.HELD);
        reservation.setCreatedAt(Instant.now());

        return reservationRepo.save(reservation);
    }

    public void cancelByCustomer(String reservationId, String userId) {
        Reservation r = getOrThrow(reservationId);

        if (!userId.equals(r.getUserId())) {
            throw new IllegalStateException("Unauthorized cancel");
        }

        r.setStatus(ReservationStatus.CANCELLED);
        reservationRepo.save(r);
    }



    public Reservation holdForOrder(
            HoldReservationRequest req,
            String orderId
    ) {
        validateAvailability(req);

        Reservation reservation = new Reservation();
        reservation.setOrderId(orderId);
        reservation.setTableNumber(req.getTableNumber());
        reservation.setDate(req.getDate());
        reservation.setTime(req.getTime());
        reservation.setStatus(ReservationStatus.HELD);
        reservation.setCreatedAt(Instant.now());

        return reservationRepo.save(reservation);
    }

    public String createReservation(
            String userId,
            String date,
            String time,
            int guests,
            String tableLabel
    ) {
        Reservation reservation = new Reservation();

        reservation.setUserId(userId);
        reservation.setTableNumber(tableLabel);

        reservation.setDate(LocalDate.parse(date));
        reservation.setTime(LocalTime.parse(time));
        reservation.setCreatedAt(Instant.now());

        reservation.setStatus(ReservationStatus.CONFIRMED);

        reservationRepo.save(reservation);
        return reservation.getReservationId();
    }

    public void confirm(String reservationId, String orderId) {
        Reservation r = getOrThrow(reservationId);

        if (!orderId.equals(r.getOrderId())) {
            throw new IllegalStateException("Invalid order");
        }

        if (r.getStatus() != ReservationStatus.HELD) {
            throw new IllegalStateException("Invalid reservation state");
        }

        r.setStatus(ReservationStatus.CONFIRMED);
        reservationRepo.save(r);
    }

    public void release(String reservationId, String orderId) {
        Reservation r = getOrThrow(reservationId);

        if (!orderId.equals(r.getOrderId())) {
            throw new IllegalStateException("Invalid order");
        }

        r.setStatus(ReservationStatus.CANCELLED);
        reservationRepo.save(r);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepo.findAll();
    }


    private void validateAvailability(HoldReservationRequest req) {
        boolean exists =
                reservationRepo.existsByTableNumberAndDateAndTimeAndStatusIn(
                        req.getTableNumber(),
                        req.getDate(),
                        req.getTime(),
                        List.of(
                                ReservationStatus.HELD,
                                ReservationStatus.CONFIRMED
                        )
                );

        if (exists) {
            throw new RuntimeException("Table already booked");
        }
    }

    private Reservation getOrThrow(String id) {
        return reservationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }
}
