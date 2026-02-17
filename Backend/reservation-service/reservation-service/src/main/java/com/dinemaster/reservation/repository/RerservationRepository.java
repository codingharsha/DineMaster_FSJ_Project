package com.dinemaster.reservation.repository;

import com.dinemaster.reservation.model.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RerservationRepository extends MongoRepository<Reservation, String> {
    List<Reservation> getReservationByCustomerName(String customerName);
}
