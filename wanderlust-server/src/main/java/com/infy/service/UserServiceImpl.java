package com.infy.service;

import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infy.dto.UserDTO;
import com.infy.entity.User;
import com.infy.exception.WanderLustException;
import com.infy.repository.UserRepository;
import com.infy.utility.HashingUtility;

import jakarta.transaction.Transactional;

@Service(value = "userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDTO authenticateUser(String contactNumber, String password) throws WanderLustException {

		User optionalUser = userRepository.findByContactNumber(contactNumber);
		if (optionalUser == null) {
			throw new WanderLustException("UserService.INVALID_CREDENTIALS");
		}

		String passwordFromDB = optionalUser.getPassword();

		if (passwordFromDB != null) {
			try {
				String hashedPassword = HashingUtility.getHashValue(password);
				if (hashedPassword.equals(passwordFromDB)) {
					UserDTO userObject = new UserDTO();
					userObject.setContactNumber(optionalUser.getContactNumber());
					userObject.setEmailId(optionalUser.getEmailId());
					userObject.setUserId(optionalUser.getUserId());
					userObject.setUserName(optionalUser.getUserName());
					return userObject;
				} else
					throw new WanderLustException("UserService.INVALID_CREDENTIALS");
			} catch (NoSuchAlgorithmException e) {
				throw new WanderLustException("UserService.HASH_FUNCTION_EXCEPTION");
			}

		} else
			throw new WanderLustException("UserService.INVALID_CREDENTIALS");

	}

	@Override
	public Integer registerUser(UserDTO user) throws WanderLustException {
		try {
			User optionalUser = userRepository.findByContactNumber(user.getContactNumber());
			if (optionalUser != null)
				throw new WanderLustException("UserService.CONTACT_NUMBER_ALREADY_EXISTS");
			String hashedPassword = HashingUtility.getHashValue(user.getPassword());
			User newUser = new User();
			newUser.setUserName(user.getUserName());
			newUser.setContactNumber(user.getContactNumber());
			newUser.setEmailId(user.getEmailId());
			newUser.setPassword(hashedPassword);
			return userRepository.save(newUser).getUserId();
		} catch (Exception e) {
			throw new WanderLustException(e.getMessage());
		}
	}

	@Override
	public void findUser(String contactNumber) throws WanderLustException {
		Boolean numberExists = userRepository.existsByContactNumber(contactNumber);
		if (!numberExists)
			throw new WanderLustException("UserService.NUMBER_NOT_FOUND");
	}

	@Override
	public void updatePassword(String contactNumber, String password) throws WanderLustException {
		try {
			String hashedCode = HashingUtility.getHashValue(password);
			int updated = userRepository.updatePasswordByContactNumber(contactNumber, hashedCode);
			if (updated == 0)
				throw new WanderLustException("UserService.PASSWORD_NOT_MATCH");
		} catch (Exception e) {
			throw new WanderLustException(e.getMessage());
		}
	}

	@Override
	public void updateUserDetails(UserDTO userDTO) throws WanderLustException {
		try {
			User existingUser = userRepository.findById(userDTO.getUserId()).orElse(null);
			if (existingUser == null)
				throw new WanderLustException("UserService.USER_NOT_FOUND");
			existingUser.setUserName(userDTO.getUserName());
			existingUser.setEmailId(userDTO.getEmailId());
			existingUser.setContactNumber(userDTO.getContactNumber());
			userRepository.save(existingUser);
		} catch (Exception e) {
			throw new WanderLustException(e.getMessage());
		}
	}

}
