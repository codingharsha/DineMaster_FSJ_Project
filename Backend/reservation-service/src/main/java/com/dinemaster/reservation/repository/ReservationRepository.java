package com.dinemaster.reservation.repository;

import com.dinemaster.reservation.model.Reservation;
import com.dinemaster.reservation.model.ReservationStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public interface ReservationRepository
        extends MongoRepository<Reservation, String> {

    boolean existsByTableNumberAndDateAndTimeAndStatusIn(
            String tableNumber,
            LocalDate date,
            LocalTime time,
            List<ReservationStatus> statuses
    );

    List<Reservation> findByStatusAndCreatedAtBefore(
            ReservationStatus status,
            LocalDateTime cutoff
    );
}