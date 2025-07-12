package com.infy.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.infy.entity.Booking;

public interface BookingRepository extends CrudRepository<Booking, Integer> {
	public List<Booking> findByUserEntity_UserId(Integer userId);
}
