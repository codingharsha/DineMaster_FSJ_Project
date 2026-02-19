package com.dinemaster.reservation.repository;

import com.dinemaster.reservation.model.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends MongoRepository<Reservation, String> {
    List<Reservation> findByCustomerName(String customerName);

    List<Reservation> findByTableNumber(int tableNumber);

    List<Reservation> findByPhone(String phone);

    List<Reservation> findByDateTimeBetween(Date dateTimeAfter, Date dateTimeBefore);

    List<Reservation> findByStatus(String status);


}
