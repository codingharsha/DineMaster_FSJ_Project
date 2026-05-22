package com.dinemaster.reservation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = "com.dinemaster")
@EnableScheduling
public class ReservationServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(ReservationServiceApplication.class, args);
	}
}