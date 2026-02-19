package com.dinemaster.reservation.controller;

import com.dinemaster.reservation.model.Reservation;
import com.dinemaster.reservation.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationService service;

    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllReservations(){
        return new ResponseEntity<>(service.getAllReservations(), HttpStatus.OK);
    }

    @PostMapping("/book")
    public ResponseEntity<Reservation> bookTable(@RequestBody Reservation reservation){
        return new ResponseEntity<>(service.bookTable(reservation), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> findReservationById(@PathVariable String id){
        Reservation reservation = service.getReservationById(id);
        if(reservation != null){
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{phone}")
    public ResponseEntity<List<Reservation>> getMyReservations(@PathVariable String phone) {
        List<Reservation> list = service.getCustomerReservations(phone);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PutMapping("/assign/{id}")
    public ResponseEntity<Reservation> assignTable(@PathVariable String id, @RequestParam int tableNumber) {
        Reservation updated = service.assignTable(id, tableNumber);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<String> cancelReservation(@PathVariable String id) {
        String response = service.cancelReservation(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}