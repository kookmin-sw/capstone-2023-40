package com.thesurvey.api.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
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
public class AuthenticationServiceTest extends BaseServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authenticationService;

    @Test
    void testRegisterService() {
        UserResponseDto result = authenticationService.register(globalRegisterDto);

        assertThat(result.getName()).isEqualTo(globalRegisterDto.getName());
        assertThat(result.getPhoneNumber()).isEqualTo(globalRegisterDto.getPhoneNumber());
        assertThat(result.getUserId()).isEqualTo(
            userService.getUserByName(globalRegisterDto.getName()).getUserId());
    }

    @Test
    void testLoginService() {
        UserResponseDto userResponseDto = authenticationService.register(globalRegisterDto);
        Authentication result = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(globalEmail, globalPassword)
        );

        assertThat(result.isAuthenticated()).isTrue();
        assertThat(result.getName()).isEqualTo(userResponseDto.getName());
    }
}
