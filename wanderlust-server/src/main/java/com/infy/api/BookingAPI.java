package com.infy.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infy.dto.BookingDTO;
import com.infy.exception.WanderLustException;
import com.infy.service.BookingService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping(value = "bookingAPI")
public class BookingAPI {

	@Autowired
	private BookingService bookingService;

	@PostMapping(value = "/bookings/{userId}/{destinationId}")
	public ResponseEntity<Integer> addBooking(@RequestBody BookingDTO booking, @PathVariable Integer userId,
			@PathVariable String destinationId) throws WanderLustException {
		Integer bookingId = bookingService.addBooking(booking, userId, destinationId);
		return new ResponseEntity<Integer>(bookingId, HttpStatus.CREATED);
	}

	@GetMapping(value = "/{userId}")
	public ResponseEntity<List<BookingDTO>> getBookingRecords(@PathVariable Integer userId) throws Exception {
		List<BookingDTO> listOfBookings = bookingService.getBooking(userId);
		return new ResponseEntity<List<BookingDTO>>(listOfBookings, HttpStatus.OK);
	}

	@DeleteMapping(value = "/bookings/{bookingId}")
	public ResponseEntity<String> deleteBooking(@PathVariable Integer bookingId) throws WanderLustException {
		String message = bookingService.deleteBooking(bookingId);
		return new ResponseEntity<String>(message, HttpStatus.OK);
	}

}
