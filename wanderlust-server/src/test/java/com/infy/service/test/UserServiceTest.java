package com.infy.service.test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import com.infy.dto.UserDTO;
import com.infy.entity.User;
import com.infy.exception.WanderLustException;
import com.infy.repository.UserRepository;
import com.infy.service.UserServiceImpl;
import com.infy.utility.HashingUtility;

@SpringBootTest
public class UserServiceTest {

	@Mock
	private UserRepository userRepository;

	@Mock
	private HashingUtility hashingUtility;

	@InjectMocks
	private UserServiceImpl userServiceImpl;

	@Test
	public void invalidLoginInvalidUserTest() throws Exception {
		User user = new User();

		String contactNo = "1234567890";
		String password = "abcd";

		user.setPassword("xyz");

		Mockito.when(userRepository.findByContactNumber(contactNo)).thenReturn(user);
		WanderLustException exception = Assertions.assertThrows(WanderLustException.class,
				() -> userServiceImpl.authenticateUser(contactNo, password));
		Assertions.assertEquals("UserService.INVALID_CREDENTIALS", exception.getMessage());
	}

	@Test
	public void userAlreadyRegisteredTest() throws Exception {
		UserDTO userDTO = new UserDTO();
		userDTO.setUserName("Alice");
		userDTO.setEmailId("alice@example.com");
		userDTO.setContactNumber("9988776655");
		userDTO.setPassword("abcd");

		User user = new User();
		user.setContactNumber("9988776655");

		Mockito.when(userRepository.findByContactNumber("9988776655")).thenReturn(user);
		WanderLustException exception = Assertions.assertThrows(WanderLustException.class,
				() -> userServiceImpl.registerUser(userDTO));
		Assertions.assertEquals("UserService.CONTACT_NUMBER_ALREADY_EXISTS", exception.getMessage());
	}

	@Test
	public void registerUserValidTest() throws Exception {
		UserDTO userDTO = new UserDTO();
		userDTO.setContactNumber("9876548788");
		userDTO.setEmailId("sree@gmail.com");
		userDTO.setUserName("Sree");
		userDTO.setPassword("Sree@1234");

		Mockito.when(userRepository.findByContactNumber(userDTO.getContactNumber())).thenReturn(null);
		User user = new User();
		user.setUserId(107);

		Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
		Integer userId = userServiceImpl.registerUser(userDTO);
		Assertions.assertEquals(107, userId);
	}

	@Test
	public void authenticateUserInvalidContactNumberTest() {
		String contactNumber = "1234567890";
		String password = "Vedha@1234";
		Mockito.when(userRepository.findByContactNumber(contactNumber)).thenReturn(null);
		WanderLustException exception = Assertions.assertThrows(WanderLustException.class,
				() -> userServiceImpl.authenticateUser(contactNumber, password));
		Assertions.assertEquals("UserService.INVALID_CREDENTIALS", exception.getMessage());
	}

	@Test
	public void testFindUser_UserExists() throws Exception {
		String contactNumber = "9876543210";
		Mockito.when(userRepository.existsByContactNumber(contactNumber)).thenReturn(true);
		Assertions.assertDoesNotThrow(() -> userServiceImpl.findUser(contactNumber));
		Mockito.verify(userRepository).existsByContactNumber(contactNumber);
	}

	@Test
	public void testFindUser_UserNotFound() throws Exception {
		String contactNumber = "0000000000";
		Mockito.when(userRepository.existsByContactNumber(contactNumber)).thenReturn(false);
		WanderLustException exception = Assertions.assertThrows(WanderLustException.class,
				() -> userServiceImpl.findUser(contactNumber));
		Assertions.assertEquals("UserService.NUMBER_NOT_FOUND", exception.getMessage());
	}

	@Test
	public void updatePasswordValidTest() throws Exception {
		String contactNumber = "9876543210";
		String password = "Vijay@123";
		String hasedPassword = HashingUtility.getHashValue(password);
		Mockito.when(userRepository.updatePasswordByContactNumber(contactNumber, hasedPassword)).thenReturn(1);
		userServiceImpl.updatePassword(contactNumber, password);
	}

	@Test
	public void changePasswordInvalidTest() throws Exception {
		String contactNumber = "9876543210";
		String password = "Vijay@123";
		String hasedPassword = HashingUtility.getHashValue(password);
		Mockito.when(userRepository.updatePasswordByContactNumber(contactNumber, hasedPassword)).thenReturn(1);
		WanderLustException exception = Assertions.assertThrows(WanderLustException.class,
				() -> userServiceImpl.updatePassword(contactNumber, hasedPassword));
		Assertions.assertEquals("UserService.PASSWORD_NOT_MATCH", exception.getMessage());
	}

	@Test
	public void authenticateUserValidTest() throws Exception {
		String contactNumber = "9876543210";
		String password = "Vijay@123";
		String hasedPassword = HashingUtility.getHashValue(password);

		User user = new User();
		user.setContactNumber(contactNumber);
		user.setPassword(hasedPassword);
		user.setEmailId("vijaya@gmail.com");
		user.setUserId(101);
		user.setUserName("Vijaya");

		Mockito.when(userRepository.findByContactNumber(contactNumber)).thenReturn(user);
		UserDTO userDTO = userServiceImpl.authenticateUser(contactNumber, password);

		Assertions.assertNotNull(userDTO);
		Assertions.assertEquals(contactNumber, userDTO.getContactNumber());
		Assertions.assertEquals("vijaya@gmail.com", userDTO.getEmailId());
	}

	@Test
	public void invalidRegisterUserTest() throws Exception {
		UserDTO userDTO = new UserDTO();
		userDTO.setContactNumber("8884967823");
		userDTO.setEmailId("jack@email.com");
		userDTO.setUserName("Jack");

		User existingUser = new User();
		existingUser.setContactNumber("8884967823");

		Mockito.when(userRepository.findByContactNumber("8884967823")).thenReturn(existingUser);
		Exception e = Assertions.assertThrows(Exception.class, () -> userServiceImpl.registerUser(userDTO));
		Assertions.assertEquals("UserService.CONTACT_NUMBER_ALREADY_EXISTS", e.getMessage());
	}

}
