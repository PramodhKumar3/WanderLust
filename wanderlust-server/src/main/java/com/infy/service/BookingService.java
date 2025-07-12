package com.infy.service;

import java.util.List;

import com.infy.dto.BookingDTO;
import com.infy.exception.WanderLustException;

public interface BookingService {

	public Integer addBooking(BookingDTO bookingDTO, Integer userId, String destinationId) throws WanderLustException;

	public List<BookingDTO> getBooking(Integer userId) throws WanderLustException;

	public String deleteBooking(Integer bookingId) throws WanderLustException;

}
