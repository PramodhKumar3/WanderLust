package com.infy.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Itinerary {

	@Id
	private String itineraryId;
	private String firstDay;
	private String restOfDays;
	private String lastDay;

}
