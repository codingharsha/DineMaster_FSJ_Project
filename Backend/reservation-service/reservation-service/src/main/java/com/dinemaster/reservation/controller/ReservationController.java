package com.dinemaster.reservation.controller;

import com.dinemaster.reservation.model.Reservation;
import com.dinemaster.reservation.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins = "Http://localhost:3000")
public class ReservationController {
    @Autowired
    public ReservationService service;

    public ResponseEntity<List<Reservation>> getAllReservations(){
        return new ResponseEntity<>(service.getAllReservations(), HttpStatus.OK);
    }

    public ResponseEntity<Reservation> bookTable(Reservation reservation){
        return new ResponseEntity<>(service.bookTable(reservation), HttpStatus.OK);
    }

    public ResponseEntity<Reservation> findReservationById(String id){
        Reservation reservation = service.getReservationById(id);
        if(reservation != null){
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
