package com.infy.repository;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.CrudRepository;

import com.infy.entity.Destination;

public interface PackageRepository extends CrudRepository<Destination, String> {
	public List<Destination> findByContinent(String continent);

	public List<Package> findAll(Specification<Package> spec);
}
