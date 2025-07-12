package com.infy.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
@Data
public class UserDTO {

	private Integer userId;
	@Pattern(regexp = "([A-Za-z])+(\\s[A-Za-z]+)*", message = "{invalid.customer.format}")
	private String userName;
	@NotNull(message = "{email.absent}")
	@Pattern(regexp = "[A-Za-z0-9]+@[A-Za-z]+[.]com", message = "{invalid.email.format}")
	private String emailId;
	@Pattern(regexp = "[6-9][0-9]{9}", message = "{invalid.phonenumber.format}")
	private String contactNumber;
	@NotNull(message = "{password.absent}")
	@Pattern(regexp = ".*[A-Z]+.*", message = "{invalid.password.format.uppercase}")
	@Pattern(regexp = ".*[a-z]+.*", message = "{invalid.password.format.lowercase}")
	@Pattern(regexp = ".*[0-9]+.*", message = "{invalid.password.format.number}")
	@Pattern(regexp = ".*[!@#$%^&*].*", message = "{invalid.password.format.specialcharacter}")
	private String password;

	
}

