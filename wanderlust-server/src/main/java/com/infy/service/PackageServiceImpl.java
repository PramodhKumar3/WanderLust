package com.infy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.infy.dto.DestinationDTO;
import com.infy.dto.DetailsDTO;
import com.infy.dto.ItineraryDTO;
import com.infy.entity.Destination;
import com.infy.entity.Details;
import com.infy.entity.Itinerary;
import com.infy.exception.WanderLustException;
import com.infy.repository.PackageRepository;

import jakarta.transaction.Transactional;

@Service(value = "packageService")
@Transactional
public class PackageServiceImpl implements PackageService {

	@Autowired
	private PackageRepository packageRepository;

	@Override
	public List<DestinationDTO> getPackagesSearch(String continent) throws WanderLustException {
		List<Destination> destinations = packageRepository.findByContinent(continent);
		if (destinations.isEmpty())
			throw new WanderLustException("PackageService.PACKAGE_UNAVAILABLE");

		List<DestinationDTO> listOfDestinationDTOs = new ArrayList<>();
		for (Destination destination : destinations) {
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

			Details details = destination.getDetails();
			if (details != null) {
				DetailsDTO detailsDTO = new DetailsDTO();
				detailsDTO.setDetailsId(details.getDetailsId());
				detailsDTO.setAbout(details.getAbout());
				detailsDTO.setPackageInclusion(details.getPackageInclusion());
				detailsDTO.setHighlights(details.getHighlights());
				detailsDTO.setPace(details.getPace());

				Itinerary itinerary = destination.getDetails().getItinerary();
				if (itinerary != null) {
					ItineraryDTO itineraryDTO = new ItineraryDTO();
					itineraryDTO.setItineraryId(itinerary.getItineraryId());
					itineraryDTO.setFirstDay(itinerary.getFirstDay());
					itineraryDTO.setLastDay(itinerary.getLastDay());
					itineraryDTO.setRestOfDays(itinerary.getRestOfDays());
					detailsDTO.setItinerary(itineraryDTO);
				}
				destinationDTO.setDetails(detailsDTO);
			}
			listOfDestinationDTOs.add(destinationDTO);
		}
		return listOfDestinationDTOs;
	}

	public DestinationDTO getItinerary(String destinationId) throws WanderLustException {
		Destination destination = packageRepository.findById(destinationId)
				.orElseThrow(() -> new WanderLustException("PackageService.ITINERARY_UNAVAILABLE"));

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

		Details details = destination.getDetails();
		if (details != null) {
			DetailsDTO detailsDTO = new DetailsDTO();
			detailsDTO.setDetailsId(details.getDetailsId());
			detailsDTO.setAbout(details.getAbout());
			detailsDTO.setPackageInclusion(details.getPackageInclusion());
			detailsDTO.setHighlights(details.getHighlights());
			detailsDTO.setPace(details.getPace());

			Itinerary itinerary = destination.getDetails().getItinerary();
			if (itinerary != null) {
				ItineraryDTO itineraryDTO = new ItineraryDTO();
				itineraryDTO.setItineraryId(itinerary.getItineraryId());
				itineraryDTO.setFirstDay(itinerary.getFirstDay());
				itineraryDTO.setLastDay(itinerary.getLastDay());
				itineraryDTO.setRestOfDays(itinerary.getRestOfDays());
				detailsDTO.setItinerary(itineraryDTO);
			}
			destinationDTO.setDetails(detailsDTO);
		}
		return destinationDTO;
	}

	@Override
	public List<DestinationDTO> getPackages() throws WanderLustException {
		List<Destination> destinations = (List<Destination>) packageRepository.findAll();
		if (destinations.isEmpty())
			throw new WanderLustException("PackageService.PACKAGE_UNAVAILABLE");
		List<DestinationDTO> listOfDestinationDTOs = new ArrayList<>();
		for (Destination destination : destinations) {
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

			Details details = destination.getDetails();
			if (details != null) {
				DetailsDTO detailsDTO = new DetailsDTO();
				detailsDTO.setDetailsId(details.getDetailsId());
				detailsDTO.setAbout(details.getAbout());
				detailsDTO.setPackageInclusion(details.getPackageInclusion());
				detailsDTO.setHighlights(details.getHighlights());
				detailsDTO.setPace(details.getPace());

				Itinerary itinerary = destination.getDetails().getItinerary();
				if (itinerary != null) {
					ItineraryDTO itineraryDTO = new ItineraryDTO();
					itineraryDTO.setItineraryId(itinerary.getItineraryId());
					itineraryDTO.setFirstDay(itinerary.getFirstDay());
					itineraryDTO.setLastDay(itinerary.getLastDay());
					itineraryDTO.setRestOfDays(itinerary.getRestOfDays());
					detailsDTO.setItinerary(itineraryDTO);
				}
				destinationDTO.setDetails(detailsDTO);
			}
			listOfDestinationDTOs.add(destinationDTO);
		}
		return listOfDestinationDTOs;
	}

	@Override
	public List<Package> filterPackages(Double minPrice, Double maxPrice, Integer minDuration, Integer maxDuration,
			String destinationType) {

		Specification<Package> spec = Specification.where(null);
		if (minPrice != null)
			spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder
					.greaterThanOrEqualTo(root.get("chargePerPerson"), minPrice));
		if (maxPrice != null)
			spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder
					.lessThanOrEqualTo(root.get("chargePerPerson"), maxPrice));
		if (minDuration != null)
			spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder
					.greaterThanOrEqualTo(root.get("noOfNights"), minDuration));
		if (maxDuration != null)
			spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("noOfNights"),
					maxDuration));
		if (destinationType != null)
			spec = spec.and(
					(root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("continent"), destinationType));

		return packageRepository.findAll(spec);
	}

}
