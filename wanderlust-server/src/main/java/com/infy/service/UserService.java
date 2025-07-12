package com.infy.service;

import com.infy.dto.UserDTO;
import com.infy.exception.WanderLustException;

public interface UserService {

	public UserDTO authenticateUser(String contactNumber, String password) throws WanderLustException;

	public Integer registerUser(UserDTO user) throws WanderLustException;

	public void findUser(String contactNumber) throws WanderLustException;

	public void updatePassword(String contactNumber, String password) throws WanderLustException;

	public void updateUserDetails(UserDTO userDTO) throws WanderLustException;

}
