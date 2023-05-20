package com.thesurvey.api.controller;


import java.util.UUID;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
import com.thesurvey.api.domain.PointHistory;
import com.thesurvey.api.dto.request.user.UserLoginRequestDto;
import com.thesurvey.api.dto.request.user.UserRegisterRequestDto;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.AuthenticationService;
import com.thesurvey.api.service.SurveyService;
import com.thesurvey.api.service.UserService;
import com.thesurvey.api.service.mapper.UserMapper;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
public class AuthenticationControllerTest extends BaseControllerTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    UserService userService;

    @Autowired
    SurveyService surveyService;

    @Autowired
    UserMapper userMapper;

    Authentication authentication;

    @Test
    void testMockRegister() throws Exception {
        // given
        UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("test")
            .email("test@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();

        // when
        MvcResult result = mockRegister(userRegisterRequestDto, true);
        JSONObject content = new JSONObject(result.getResponse().getContentAsString());

        // then
        assertThat(content.get("name")).isEqualTo(userRegisterRequestDto.getName());
        assertThat(content.get("role")).isEqualTo(String.valueOf(Role.USER));
        assertThat(content.get("email")).isEqualTo(userRegisterRequestDto.getEmail());
        assertThat(content.get("userPoints")).isEqualTo(PointHistory.USER_INITIAL_POINT);
    }

    @Test
    void testMockLogin() throws Exception {
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
        MvcResult registerResult = mockRegister(userRegisterRequestDto, true);
        JSONObject registerContent = new JSONObject(
            registerResult.getResponse().getContentAsString());

        MvcResult loginResult = mockLogin(userLoginRequestDto, true);
        JSONObject loginContent = new JSONObject(loginResult.getResponse().getContentAsString());
        authentication = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(userRegisterRequestDto.getEmail(),
                userRegisterRequestDto.getPassword())
        );

        assertThat(authentication.isAuthenticated()).isTrue();
        assertThat(registerContent.get("name")).isEqualTo(loginContent.get("name"));
        assertThat(registerContent.get("email")).isEqualTo(loginContent.get("email"));
        assertThat(registerContent.get("role")).isEqualTo(loginContent.get("role"));
        assertThat(registerContent.get("phoneNumber")).isEqualTo(loginContent.get("phoneNumber"));
    }

    @Test
    void testPasswordFormat() throws Exception {
        // given
        String[] invalidPasswords = {
            "Short1!",
            "ThisisTooooooooooooooooolongPassword123@",
            "There is s p a c e123@",
            "lowercase123!",
            "OnlyStrings!@",
            "ONLYCAPITALS123!@",
            "   Password123@",
            "Password123@    ",
            "    Password123@    ",
            null,
            "",
            "     "
        };

        String[] validPasswords = {
            "ThisisValidPassword123@",
            "MyPassword!$%123",
        };

        for (String invalidPassword : invalidPasswords) {
            // when
            String uniqueId = UUID.randomUUID().toString(); // To avoid duplicate user name or email

            UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
                .name(uniqueId + "test")
                .email(uniqueId + "test@gmail.com")
                .password(invalidPassword)
                .phoneNumber("01012345678")
                .build();

            // then
            mockRegister(userRegisterRequestDto, false);
        }

        for (String validPassword : validPasswords) {
            // when
            String uniqueId = UUID.randomUUID().toString(); // To avoid duplicate user name or email

            UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
                .name(uniqueId + "test")
                .email(uniqueId + "test@gmail.com")
                .password(validPassword)
                .phoneNumber("01012345678")
                .build();

            // then
            mockRegister(userRegisterRequestDto, true);
        }
    }

    @Test
    void testPhoneNumberFormat() throws Exception {
        // given
        String[] invalidPhoneNumbers = {
            "010-1234-5678",
            "some string",
            null,
            "",
            "   ",
        };

        String[] validPhoneNumbers = {
            "01012345678",
            "0161112222",
        };

        for (String invalidPhoneNumber : invalidPhoneNumbers) {
            // when
            String uniqueId = UUID.randomUUID().toString(); // To avoid duplicate user name or email

            UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
                .name(uniqueId + "test")
                .email(uniqueId + "test@gmail.com")
                .password("Password40@")
                .phoneNumber(invalidPhoneNumber)
                .build();

            // then
            mockRegister(userRegisterRequestDto, false);
        }

        for (String validPhoneNumber : validPhoneNumbers) {
            // when
            String uniqueId = UUID.randomUUID().toString(); // To avoid duplicate user name or email

            UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
                .name(uniqueId + "test")
                .email(uniqueId + "test@gmail.com")
                .password("Password40@")
                .phoneNumber(validPhoneNumber)
                .build();

            // then
            mockRegister(userRegisterRequestDto, true);
        }
    }

}
