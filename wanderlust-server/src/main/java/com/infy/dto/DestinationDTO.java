package com.infy.dto;

import lombok.Data;

@Data
public class DestinationDTO {

	private String destinationId;
	private String continent;
	private String destinationName;
	private String imageUrl;
	private int noOfNights;
	private float flightCharge;
	private float chargePerPerson;
	private float discount;
	private int availability;
	private DetailsDTO details;

}
