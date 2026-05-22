package com.dinemaster.reservation.scheduler;

import com.dinemaster.reservation.model.Reservation;
import com.dinemaster.reservation.model.ReservationStatus;
import com.dinemaster.reservation.repository.ReservationRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ReservationExpiryScheduler {

    private final ReservationRepository reservationRepo;

    public ReservationExpiryScheduler(ReservationRepository reservationRepo) {
        this.reservationRepo = reservationRepo;
    }

    @Scheduled(fixedRate = 60000)
    public void expireHeldReservations() {
        LocalDateTime cutoff =
                LocalDateTime.now().minusMinutes(15);

        List<Reservation> expired =
                reservationRepo.findByStatusAndCreatedAtBefore(
                        ReservationStatus.HELD,
                        cutoff
                );

        expired.forEach(r -> r.setStatus(ReservationStatus.EXPIRED));
        reservationRepo.saveAll(expired);
    }
}