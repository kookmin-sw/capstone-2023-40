package com.thesurvey.api.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import com.thesurvey.api.UserTestFactory;
import com.thesurvey.api.dto.response.UserResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class AuthenticationServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authenticationService;

    @Test
    void testRegisterService() {
        UserResponseDto result = authenticationService.register(
            UserTestFactory.globalUserRegisterDto);

        assertThat(result.getName()).isEqualTo(UserTestFactory.globalUserRegisterDto.getName());
        assertThat(result.getPhoneNumber()).isEqualTo(
            UserTestFactory.globalUserRegisterDto.getPhoneNumber());
        assertThat(result.getUserId()).isEqualTo(
            userService.getUserByName(UserTestFactory.globalUserRegisterDto.getName()).getUserId());
    }

    @Test
    void testLoginService() {
        UserResponseDto userResponseDto = authenticationService.register(
            UserTestFactory.globalUserRegisterDto);
        Authentication result = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(UserTestFactory.globalEmail,
                UserTestFactory.globalPassword)
        );

        assertThat(result.isAuthenticated()).isTrue();
        assertThat(result.getName()).isEqualTo(userResponseDto.getName());
    }
}
