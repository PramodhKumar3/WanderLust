package com.infy.dto;

import lombok.Data;

@Data
public class DetailsDTO {

	private String detailsId;
	private String about;
	private String packageInclusion;
	private String highlights;
	private String pace;
	private ItineraryDTO itinerary;

}
