package com.infy.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Details {
	@Id
	private String detailsId;
	private String about;
	private String packageInclusion;
	private String highlights;
	private String pace;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "itinerary_id", unique = true)
	private Itinerary itinerary;

}
