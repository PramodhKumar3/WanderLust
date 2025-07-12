package com.infy.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Destination {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String destinationId;
	private String continent;
	private String destinationName;
	private String imageUrl;
	private int noOfNights;
	private int availability;
	private float flightCharge;
	private float chargePerPerson;
	private float discount;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "details_id", unique = true)
	private Details details;

}
