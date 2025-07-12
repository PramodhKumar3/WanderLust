package com.infy.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infy.dto.DestinationDTO;
import com.infy.exception.WanderLustException;
import com.infy.service.PackageService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping(value = "packageAPI")
public class PackageAPI {

	@Autowired
	private PackageService packageService;

	@GetMapping(value = "/packages/{continent}")
	public ResponseEntity<List<DestinationDTO>> getPackagesSearch(@PathVariable String continent)
			throws WanderLustException {
		List<DestinationDTO> destinations = packageService.getPackagesSearch(continent);
		return new ResponseEntity<List<DestinationDTO>>(destinations, HttpStatus.OK);
	}

	@GetMapping(value = "/itinerary/{destinationId}")
	public ResponseEntity<DestinationDTO> getItinerary(@PathVariable String destinationId) throws WanderLustException {
		DestinationDTO destinationDTO = packageService.getItinerary(destinationId);
		return new ResponseEntity<DestinationDTO>(destinationDTO, HttpStatus.OK);
	}

	@GetMapping(value = "/getPackages")
	public ResponseEntity<List<DestinationDTO>> getPackages() throws WanderLustException {
		List<DestinationDTO> listOfDestinationDTOs = packageService.getPackages();
		return new ResponseEntity<List<DestinationDTO>>(listOfDestinationDTOs, HttpStatus.OK);
	}

	public ResponseEntity<?> filterPackages(@RequestParam(value = "minPrice", required = false) Double minPrice,
			@RequestParam(value = "maxPrice", required = false) Double maxPrice,
			@RequestParam(value = "minDuration", required = false) Integer minDuration,
			@RequestParam(value = "maxDuration", required = false) Integer maxDuration,
			@RequestParam(value = "destinationType", required = false) String destinationType) {

		List<Package> filteredPackages = packageService.filterPackages(minPrice, maxPrice, minDuration, maxDuration, destinationType);
		return ResponseEntity.ok(filteredPackages);
	}
}
