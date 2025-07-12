package com.infy.service.test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import com.infy.dto.BookingDTO;
import com.infy.entity.Booking;
import com.infy.entity.Destination;
import com.infy.entity.Details;
import com.infy.entity.Itinerary;
import com.infy.entity.User;
import com.infy.exception.WanderLustException;
import com.infy.repository.BookingRepository;
import com.infy.repository.PackageRepository;
import com.infy.repository.UserRepository;
import com.infy.service.BookingServiceImpl;

// 	"checkIn": "2023-11-12"
//	"checkOut": "2023-11-23"
//	"noOfPeople": 4

@SpringBootTest
public class BookingServiceTest {

	@Mock
	private BookingRepository bookingRepository;

	@Mock
	private PackageRepository packageRepository;

	@Mock
	private UserRepository userRepository;

	@InjectMocks
	private BookingServiceImpl bookingServiceImpl;

	@Test
	public void addBookingValidTest() throws Exception {
		BookingDTO bookingDTO = new BookingDTO();
		bookingDTO.setCheckIn(LocalDate.of(2023, 11, 12));
		bookingDTO.setCheckOut(LocalDate.of(2023, 11, 23));
		bookingDTO.setNoOfPeople(4);

		User user = new User();
		user.setUserId(107);

		Destination destination = new Destination();
		destination.setDestinationId("D1001");
		destination.setAvailability(30);
		destination.setChargePerPerson(2499);
		destination.setDiscount(1);

		Booking booking = new Booking();
		booking.setBookingId(1001);

		Mockito.when(userRepository.findById(107)).thenReturn(Optional.of(user));
		Mockito.when(packageRepository.findById("D1001")).thenReturn(Optional.of(destination));
		Mockito.when(bookingRepository.save(Mockito.any(Booking.class))).thenReturn(booking);
		Integer bookingId = bookingServiceImpl.addBooking(bookingDTO, 107, "D1001");
		Assertions.assertEquals(1001, bookingId);
	}

	@Test
	public void addBookingUserNotFoundTest() throws Exception {
		BookingDTO bookingDTO = new BookingDTO();
		Mockito.when(userRepository.findById(101)).thenReturn(Optional.empty());
		Exception exception = Assertions.assertThrows(WanderLustException.class,
				() -> bookingServiceImpl.addBooking(bookingDTO, 101, "D001"));
		Assertions.assertEquals("BookingService.NO_BOOKING", exception.getMessage());
	}

	@Test
	public void addBookingDestinationNotFoundTest() throws Exception {
		BookingDTO bookingDTO = new BookingDTO();
		User user = new User();
		user.setUserId(101);
		Mockito.when(userRepository.findById(101)).thenReturn(Optional.of(user));
		Mockito.when(packageRepository.findById("D1001")).thenReturn(Optional.empty());
		Exception exception = Assertions.assertThrows(WanderLustException.class,
				() -> bookingServiceImpl.addBooking(bookingDTO, 101, "D1001"));
		Assertions.assertEquals("PackageService.ITINERARY_UNAVAILABLE", exception.getMessage());
	}

	@Test
	public void addBookingInsufficientAvailabilityTest() throws Exception {
		BookingDTO bookingDTO = new BookingDTO();
		bookingDTO.setCheckIn(LocalDate.of(2023, 11, 23));
		bookingDTO.setCheckOut(LocalDate.of(2023, 11, 23));
		bookingDTO.setNoOfPeople(7);

		User user = new User();
		user.setUserId(107);

		Destination destination = new Destination();
		destination.setDestinationId("D1001");
		destination.setAvailability(2);
		destination.setChargePerPerson(2499);
		destination.setDiscount(1);

		Mockito.when(userRepository.findById(107)).thenReturn(Optional.of(user));
		Mockito.when(packageRepository.findById("D1001")).thenReturn(Optional.of(destination));
		Exception exception = Assertions.assertThrows(WanderLustException.class,
				() -> bookingServiceImpl.addBooking(bookingDTO, 101, "D1001"));
		Assertions.assertEquals("BookingService.NO_BOOKING", exception.getMessage());
	}

	@Test
	public void getBookingValidTest() throws Exception {
		Itinerary itinerary = new Itinerary();
		itinerary.setItineraryId("I1001");
		itinerary.setFirstDay("Arrival and Relax");
		itinerary.setLastDay("Departure");
		itinerary.setRestOfDays("Beach Visit, Local Sighting");

		Details details = new Details();
		details.setDetailsId("DL101");
		details.setAbout("Beach Paradise");
		details.setPackageInclusion("Breakfast, Dinner");
		details.setHighlights("Sunset, Beaches");
		details.setPace("Relaxed");
		details.setItinerary(itinerary);

		Destination destination = new Destination();
		destination.setAvailability(10);
		destination.setDestinationId("D1001");
		destination.setDestinationName("Goa");
		destination.setChargePerPerson(2000);
		destination.setContinent("Asia");
		destination.setDiscount(2);
		destination.setFlightCharge(500);
		destination.setImageUrl("goa.png");
		destination.setNoOfNights(2);
		destination.setDetails(details);

		User user = new User();
		user.setUserId(101);
		user.setUserName("Sree");
		user.setEmailId("scott@stark.com");
		user.setPassword("scott@1234");
		user.setContactNumber("8884967823");

		Booking booking = new Booking();
		booking.setBookingId(1001);
		booking.setCheckIn(LocalDate.of(2023, 11, 12));
		booking.setCheckOut(LocalDate.of(2023, 11, 12));
		booking.setNoOfPeople(7);
		booking.setTimeOfBooking(LocalDateTime.now());
		booking.setTotalCost(8000);
		booking.setDestinationEntity(destination);
		booking.setUserEntity(user);

		List<Booking> bookings = new ArrayList<>();
		bookings.add(booking);

		Mockito.when(bookingRepository.findByUserEntity_UserId(101)).thenReturn(bookings);
		List<BookingDTO> bookingDTOs = bookingServiceImpl.getBooking(101);
		Assertions.assertEquals(1, bookingDTOs.size());
		Assertions.assertEquals("Goa", bookingDTOs.get(0).getDestination().getDestinationName());
		Assertions.assertEquals("Sree", bookingDTOs.get(0).getUsers().getUserName());
		Assertions.assertEquals(8000, bookingDTOs.get(0).getTotalCost());
	}

	@Test
	public void getBookingNoBookingTest() throws Exception {
		Mockito.when(bookingRepository.findByUserEntity_UserId(101)).thenReturn(new ArrayList<>());
		Exception exception = Assertions.assertThrows(WanderLustException.class,
				() -> bookingServiceImpl.getBooking(101));
		Assertions.assertEquals("BookingService.NO_BOOKING", exception.getMessage());
	}

	@Test
	public void deleteBookingValidTest() throws Exception {
		Integer bookingId = 1001;
		Booking booking = new Booking();
		booking.setBookingId(bookingId);

		Mockito.when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(booking));
		String message = bookingServiceImpl.deleteBooking(bookingId);
		Assertions.assertEquals("Booking Deleted Successfully !!!", message);
	}

	@Test
	public void deleteBookingInValidTest() throws Exception {
		Integer bookingId = 1001;
		Mockito.when(bookingRepository.findById(bookingId)).thenReturn(Optional.empty());
		Exception exception = Assertions.assertThrows(WanderLustException.class,
				() -> bookingServiceImpl.deleteBooking(bookingId));
		Assertions.assertEquals("BookingService.NO_BOOKING", exception.getMessage());
	}

}