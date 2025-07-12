package com.infy.service.test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.infy.dto.DestinationDTO;
import com.infy.entity.Destination;
import com.infy.entity.Details;
import com.infy.entity.Itinerary;
import com.infy.exception.WanderLustException;
import com.infy.repository.PackageRepository;
import com.infy.service.PackageServiceImpl;

@SpringBootTest
public class PackageServiceTest {

	@Mock
	private PackageRepository packageRepository;

	@InjectMocks
	private PackageServiceImpl packageServiceImpl;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void testGetPacakgeSearch_validInput_returnsDTOList() throws WanderLustException {
		Itinerary itinerary = new Itinerary();
		itinerary.setFirstDay("Day 1");
		itinerary.setRestOfDays("Day 2-4");
		itinerary.setItineraryId("1");
		itinerary.setLastDay("Day 5");

		Details details = new Details();
		details.setDetailsId("10");
		details.setAbout("Tour Info");
		details.setPackageInclusion("All Included");
		details.setHighlights("Beaches");
		details.setPace("Relaxed");
		details.setItinerary(itinerary);

		Destination destination = new Destination();
		destination.setDestinationId("101");
		destination.setContinent("Asia");
		destination.setNoOfNights(4);
		destination.setFlightCharge(500);
		destination.setChargePerPerson(1500);
		destination.setDiscount(100);
		destination.setAvailability(5);
		destination.setDetails(details);

		List<Destination> destinations = Collections.singletonList(destination);
		Mockito.when(packageRepository.findByContinent("Asia")).thenReturn(destinations);
		List<DestinationDTO> result = packageServiceImpl.getPackagesSearch("Asia");
		Assertions.assertEquals(1, result.size());
		Assertions.assertEquals("Asia", result.get(0).getContinent());
	}

	@Test
	public void testGetPackageSearch_emptyList_throwsException() throws WanderLustException {
		Mockito.when(packageRepository.findByContinent("Europe")).thenReturn(Collections.emptyList());
		Assertions.assertThrows(WanderLustException.class, () -> packageServiceImpl.getPackagesSearch("Europe"));
	}

	@Test
	public void testGetPackagesSearch_nullList_throwsException() throws WanderLustException {
		Mockito.when(packageRepository.findByContinent("Africa")).thenReturn(Collections.emptyList());
		Assertions.assertThrows(WanderLustException.class, () -> packageServiceImpl.getPackagesSearch("Africa"));
	}

	@Test
	public void testGetPackages_EmptyDestinationList() throws WanderLustException {
		Mockito.when(packageRepository.findAll()).thenReturn(Collections.emptyList());
		WanderLustException exception = Assertions.assertThrows(WanderLustException.class,
				() -> packageServiceImpl.getPackages());
		Assertions.assertEquals("PackageService.PACKAGE_UNAVAILABLE", exception.getMessage());
	}

	@Test
	public void testGetPackagesValid() throws WanderLustException {
		Itinerary itinerary = new Itinerary();
		itinerary.setFirstDay("Day 1");
		itinerary.setRestOfDays("Rest");
		itinerary.setItineraryId("I1001");
		itinerary.setLastDay("Day 5");

		Details details = new Details();
		details.setAbout("About Place");
		details.setPackageInclusion("Flights, Hotels");
		details.setPace("Moderate");
		details.setItinerary(itinerary);

		Destination destination = new Destination();
		destination.setDestinationId("D1001");
		destination.setDestinationName("A Week in Greeces Athens, Myknons & Santorini");
		destination.setContinent("Europe");
		destination.setNoOfNights(7);
		destination.setChargePerPerson(2499);
		destination.setDiscount(0);
		destination.setAvailability(30);
		destination.setImageUrl("paris.jpg");
		destination.setDetails(details);

		List<Destination> listOfDestination = List.of(destination);
		Mockito.when(packageRepository.findAll()).thenReturn(listOfDestination);
		Assertions.assertEquals("Europe", destination.getContinent());
	}

	@Test
	public void testGetAllPackages() throws WanderLustException {
		Itinerary itinerary = new Itinerary();
		itinerary.setFirstDay("Arrival in Paris");
		itinerary.setRestOfDays("Explore Paris");
		itinerary.setItineraryId("1TI123");
		itinerary.setLastDay("Departure from Paris");

		Details details = new Details();
		details.setDetailsId("DET123");
		details.setAbout("About Paris");
		details.setPackageInclusion("Flights, Hotel");
		details.setPace("Relaxed");
		details.setItinerary(itinerary);

		Destination destination = new Destination();
		destination.setDestinationId("DEST123");
		destination.setContinent("Europe");
		destination.setNoOfNights(3);
		destination.setFlightCharge(500);
		destination.setChargePerPerson(1000);
		destination.setDiscount(10);
		destination.setAvailability(5);
		destination.setImageUrl("paris.jpg");
		destination.setDetails(details);

		Mockito.when(packageRepository.findAll()).thenReturn(List.of(destination));
		List<DestinationDTO> result = packageServiceImpl.getPackages();
		Assertions.assertEquals(1, result.size());
		DestinationDTO destinationDTO = result.get(0);

		Assertions.assertEquals(null, destinationDTO.getDestinationName());
		Assertions.assertEquals("Europe", destinationDTO.getContinent());
		Assertions.assertEquals(1000, destinationDTO.getChargePerPerson());
		Assertions.assertEquals(5, destinationDTO.getAvailability());
		Assertions.assertNotNull(destinationDTO.getDetails());
		Assertions.assertEquals("About Paris", destinationDTO.getDetails().getAbout());
		Assertions.assertNotNull(destinationDTO.getDetails().getItinerary());
		Assertions.assertEquals("Arrival in Paris", destinationDTO.getDetails().getItinerary().getFirstDay());
	}

	@Test
	public void testGetItinerary_InvalidDestinationId_ShouldThrowException() throws WanderLustException {
		String invalidDestinationId = "invalid123";
		Mockito.when(packageRepository.findById(invalidDestinationId)).thenReturn(Optional.empty());
		Assertions.assertThrows(WanderLustException.class, () -> packageServiceImpl.getItinerary(invalidDestinationId));
		Mockito.verify(packageRepository).findById(invalidDestinationId);
	}

	@Test
	public void testGetItierary_Success() throws WanderLustException {
		String destinationId = "1";

		Itinerary itinerary = new Itinerary();
		itinerary.setFirstDay("Day 1");
		itinerary.setRestOfDays("Day 2-4");
		itinerary.setItineraryId("1");
		itinerary.setLastDay("Day 5");

		Details details = new Details();
		details.setDetailsId("10");
		details.setAbout("Tour Info");
		details.setPackageInclusion("All Included");
		details.setHighlights("Beaches");
		details.setPace("Relaxed");
		details.setItinerary(itinerary);

		Destination destination = new Destination();
		destination.setDestinationId("1");
		destination.setContinent("Asia");
		destination.setDestinationName("Bali");
		destination.setNoOfNights(4);
		destination.setFlightCharge(500);
		destination.setChargePerPerson(1500);
		destination.setDiscount(100);
		destination.setAvailability(5);
		destination.setDetails(details);

		Mockito.when(packageRepository.findById(destinationId)).thenReturn(Optional.of(destination));
		DestinationDTO destinationDTO = packageServiceImpl.getItinerary(destinationId);
		Assertions.assertEquals(destinationId, destinationDTO.getDestinationId());
		Assertions.assertEquals("Bali", destinationDTO.getDestinationName());
		Assertions.assertEquals("1", destinationDTO.getDetails().getItinerary().getItineraryId());
	}

}
