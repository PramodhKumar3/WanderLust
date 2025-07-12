package com.infy.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infy.dto.BookingDTO;
import com.infy.dto.DestinationDTO;
import com.infy.dto.DetailsDTO;
import com.infy.dto.ItineraryDTO;
import com.infy.dto.UserDTO;
import com.infy.entity.Booking;
import com.infy.entity.Destination;
import com.infy.entity.Details;
import com.infy.entity.Itinerary;
import com.infy.entity.User;
import com.infy.exception.WanderLustException;
import com.infy.repository.BookingRepository;
import com.infy.repository.PackageRepository;
import com.infy.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service(value = "bookingService")
@Transactional
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository bookingRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PackageRepository packageRepository;

	@Override
	public Integer addBooking(BookingDTO bookingDTO, Integer userId, String destinationId) throws WanderLustException {
		Optional<User> optionalUser = userRepository.findById(userId);
		if (optionalUser.isEmpty())
			throw new WanderLustException("BookingService.NO_BOOKING");
		Optional<Destination> optionalDestination = packageRepository.findById(destinationId);
		if (optionalDestination.isEmpty())
			throw new WanderLustException("PackageService.ITINERARY_UNAVAILABLE");

		Booking booking = new Booking();
		booking.setCheckIn(bookingDTO.getCheckIn());
		booking.setCheckOut(bookingDTO.getCheckOut());
		booking.setNoOfPeople(bookingDTO.getNoOfPeople());
		booking.setTimeOfBooking(LocalDateTime.now());

		Destination destination = optionalDestination.get();
		Integer noOfPeople = bookingDTO.getNoOfPeople();
		float chargePerPerson = destination.getChargePerPerson();
		float discount = destination.getDiscount();
		float cost = noOfPeople * chargePerPerson;
		float totalCost = cost - ((cost * discount) / 100);

		booking.setTotalCost(totalCost);
		booking.setDestinationEntity(destination);

		User user = optionalUser.get();
		booking.setUserEntity(user);

		Booking savedBooking = bookingRepository.save(booking);

		int availability = destination.getAvailability();
		if (availability < noOfPeople)
			throw new WanderLustException("BookingService.BOOKING_ERROR");

		destination.setAvailability(availability - noOfPeople);
		packageRepository.save(destination);
		if (savedBooking == null)
			throw new WanderLustException("BookingService.BOOKING_ERROR");

		return savedBooking.getBookingId();
	}

	@Override
	public List<BookingDTO> getBooking(Integer userId) throws WanderLustException {
		List<Booking> bookings = bookingRepository.findByUserEntity_UserId(userId);
		if (bookings.isEmpty())
			throw new WanderLustException("BookingService.NO_BOOKING");

		List<BookingDTO> listofBookingDTO = new ArrayList<>();
		for (Booking book : bookings) {
			Details details = book.getDestinationEntity().getDetails();
			DetailsDTO detailsDTO = new DetailsDTO();
			detailsDTO.setDetailsId(details.getDetailsId());
			detailsDTO.setAbout(details.getAbout());
			detailsDTO.setPackageInclusion(details.getPackageInclusion());
			detailsDTO.setHighlights(details.getHighlights());
			detailsDTO.setPace(details.getPace());

			Itinerary itinerary = book.getDestinationEntity().getDetails().getItinerary();
			ItineraryDTO itineraryDTO = new ItineraryDTO();
			itineraryDTO.setItineraryId(itinerary.getItineraryId());
			itineraryDTO.setFirstDay(itinerary.getFirstDay());
			itineraryDTO.setLastDay(itinerary.getLastDay());
			itineraryDTO.setRestOfDays(itinerary.getRestOfDays());
			detailsDTO.setItinerary(itineraryDTO);

			Destination destination = book.getDestinationEntity();
			DestinationDTO destinationDTO = new DestinationDTO();
			destinationDTO.setAvailability(destination.getAvailability());
			destinationDTO.setDestinationId(destination.getDestinationId());
			destinationDTO.setDestinationName(destination.getDestinationName());
			destinationDTO.setChargePerPerson(destination.getChargePerPerson());
			destinationDTO.setContinent(destination.getContinent());
			destinationDTO.setDiscount(destination.getDiscount());
			destinationDTO.setFlightCharge(destination.getFlightCharge());
			destinationDTO.setImageUrl(destination.getImageUrl());
			destinationDTO.setNoOfNights(destination.getNoOfNights());
			destinationDTO.setDetails(detailsDTO);

			User user = book.getUserEntity();
			UserDTO userDTO = new UserDTO();
			userDTO.setUserId(user.getUserId());
			userDTO.setUserName(user.getUserName());
			userDTO.setEmailId(user.getEmailId());
			userDTO.setPassword(user.getPassword());
			userDTO.setContactNumber(user.getContactNumber());

			BookingDTO bookingDTO = new BookingDTO();
			bookingDTO.setBookingId(book.getBookingId());
			bookingDTO.setCheckIn(book.getCheckIn());
			bookingDTO.setCheckOut(book.getCheckOut());
			bookingDTO.setDestination(destinationDTO);
			bookingDTO.setNoOfPeople(book.getNoOfPeople());
			bookingDTO.setTimeOfBooking(book.getTimeOfBooking());
			bookingDTO.setTotalCost(book.getTotalCost());
			bookingDTO.setUsers(userDTO);

			listofBookingDTO.add(bookingDTO);
		}
		return listofBookingDTO;
	}

	@Override
	public String deleteBooking(Integer bookingId) throws WanderLustException {
		Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
		if (optionalBooking.isEmpty())
			throw new WanderLustException("BookingService.NO_BOOKING");
		Booking booking = optionalBooking.get();
		booking.setDestinationEntity(null);
		booking.setUserEntity(null);
		bookingRepository.save(booking);
		bookingRepository.deleteById(bookingId);
		return "Booking Deleted Successfully !!!";
	}

}
