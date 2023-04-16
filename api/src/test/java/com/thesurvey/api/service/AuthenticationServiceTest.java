package com.thesurvey.api.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import com.thesurvey.api.dto.request.UserLoginRequestDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.dto.response.UserResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class AuthenticationServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Test
    void testRegisterService() {
        // given
        UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("test")
            .email("test@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();

        // when
        UserResponseDto result = authenticationService.register(userRegisterRequestDto);
        UserResponseDto foundUser = userService.getUserByName(userRegisterRequestDto.getName());
        Authentication authentication = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(userRegisterRequestDto.getEmail(),
                userRegisterRequestDto.getPassword())
        );

        // then
        assertThat(authentication.isAuthenticated()).isTrue();
        assertThat(result.getName()).isEqualTo(userRegisterRequestDto.getName());
        assertThat(result.getPhoneNumber()).isEqualTo(userRegisterRequestDto.getPhoneNumber());
        assertThat(result.getUserId()).isEqualTo(foundUser.getUserId());
        assertThat(passwordEncoder.matches(userRegisterRequestDto.getPassword(),
            authentication.getCredentials().toString())).isTrue();
    }

    @Test
    void testLoginService() {
        // given
        UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("test")
            .email("test@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();

        UserLoginRequestDto userLoginRequestDto = UserLoginRequestDto.builder()
            .email("test@gmail.com")
            .password("Password40@")
            .build();

        // when
        UserResponseDto registerResponse = authenticationService.register(userRegisterRequestDto);
        UserResponseDto loginResponse = authenticationService.login(userLoginRequestDto);
        Authentication authentication = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(userRegisterRequestDto.getEmail(),
                userRegisterRequestDto.getPassword())
        );

        // then
        assertThat(authentication.isAuthenticated()).isTrue();
        assertThat(authentication.getName()).isEqualTo(loginResponse.getName());
        assertThat(passwordEncoder.matches(userLoginRequestDto.getPassword(),
            authentication.getCredentials().toString())).isTrue();
    }
}
