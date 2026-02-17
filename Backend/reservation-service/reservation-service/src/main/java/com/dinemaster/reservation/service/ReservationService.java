package com.dinemaster.reservation.service;

import com.dinemaster.reservation.model.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dinemaster.reservation.repository.RerservationRepository;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    public RerservationRepository repository;

    public List<Reservation> getAllReservations(){
        return repository.findAll();
    }

    public Reservation bookTable(Reservation reservation){
        reservation.setStatus("CONFIRMED");
        return repository.save(reservation);
    }

    public Reservation getReservationById(String id){
        return repository.findById(id).orElse(null);
    }
}
