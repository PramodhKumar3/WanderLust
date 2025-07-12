package com.infy.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infy.dto.UserDTO;
import com.infy.exception.WanderLustException;
import com.infy.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("userAPI")
public class UserAPI {

	@Autowired
	private UserService userService;
	@Autowired
	private Environment environment;

	@PostMapping(value = "/userLogin")
	public ResponseEntity<UserDTO> authenticateUser(@RequestBody UserDTO user) throws WanderLustException {

		UserDTO userFromDB = userService.authenticateUser(user.getContactNumber(), user.getPassword());
		return new ResponseEntity<UserDTO>(userFromDB, HttpStatus.OK);
	}

	@PostMapping(value = "/userRegister")
	public ResponseEntity<String> registerUser(@RequestBody UserDTO user) throws WanderLustException {
		Integer userId = userService.registerUser(user);
		String message = environment.getProperty("UserAPI.REGISTER_USER_SUCCESS1") + user.getUserName()
				+ environment.getProperty("UserAPI.REGISTER_USER_SUCCESS2") + userId;
		return new ResponseEntity<String>(message, HttpStatus.CREATED);

	}

}
