package com.infy.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer bookingId;
	private Integer noOfPeople;
	private LocalDate checkIn;
	private LocalDate checkOut;
	private LocalDateTime timeOfBooking;
	private float totalCost;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "destination_id", unique = true)
	private Destination destinationEntity;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User userEntity;

}
