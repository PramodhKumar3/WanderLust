package com.infy.service;

import java.util.List;

import com.infy.dto.DestinationDTO;
import com.infy.exception.WanderLustException;

public interface PackageService {

	public List<DestinationDTO> getPackagesSearch(String continent) throws WanderLustException;

	public DestinationDTO getItinerary(String destinationId) throws WanderLustException;

	public List<DestinationDTO> getPackages() throws WanderLustException;

	public List<Package> filterPackages(Double minPrice, Double maxPrice, Integer minDuration, Integer maxDuration,
			String destinationType);

}
