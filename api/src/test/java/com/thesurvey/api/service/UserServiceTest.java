package com.thesurvey.api.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.UserUpdateRequestDto;
import com.thesurvey.api.exception.BadRequestExceptionMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class UserServiceTest {

    @InjectMocks
    UserService userService;

    User user;

    Authentication fakeAuthentication;

    @BeforeAll
    void setUpBeforeAll() {
        user = User.builder()
            .name("test")
            .email("test@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();

        // Fake authentication instance. Authentication is not guaranteed on these tests
        fakeAuthentication = new UsernamePasswordAuthenticationToken(user.getEmail(),
            user.getPassword());
    }

}
