package com.infy.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BookingDTO {

	private int bookingId;
	private LocalDate checkIn;
	private LocalDate checkOut;
	private int noOfPeople;
	private float totalCost;
	private LocalDateTime timeOfBooking;
	private UserDTO users;
	private DestinationDTO destination;

}
