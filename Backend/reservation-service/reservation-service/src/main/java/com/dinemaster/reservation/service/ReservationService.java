package com.dinemaster.reservation.service;

import com.dinemaster.reservation.model.Reservation;
import com.dinemaster.reservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;
    public List<Reservation> getAllReservations(){
        return repository.findAll();
    }

    public Reservation bookTable(Reservation reservation){
        reservation.setStatus("PENDING");
        return repository.save(reservation);
    }

    public List<Reservation> getCustomerReservations(String phone) {
        return repository.findByPhone(phone);
    }

    public Reservation getReservationById(String id){
        return repository.findById(id).orElse(null);
    }

    public Reservation assignTable(String id, int tableNumber) {
        Reservation res = repository.findById(id).orElse(null);
        if (res != null) {
            res.setTableNumber(tableNumber);
            res.setStatus("CONFIRMED");
            return repository.save(res);
        }
        return null;
    }

    public String cancelReservation(String id) {
        repository.deleteById(id);
        return "Reservation Cancelled Successfully";
    }
}