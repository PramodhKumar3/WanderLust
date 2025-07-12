package com.infy.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.infy.entity.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends CrudRepository<User, Integer> {
	public User findByContactNumber(String contactNumber);

	public boolean existsByContactNumber(String contactNumber);

	@Modifying
	@Transactional
	@Query("UPDATE User u SET u.password = :password WHERE u.contactNumber = :contactNumber")
	public Integer updatePasswordByContactNumber(String contactNumber, String password);
}