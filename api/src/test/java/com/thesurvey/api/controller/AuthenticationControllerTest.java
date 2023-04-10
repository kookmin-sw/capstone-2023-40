package com.thesurvey.api.controller;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.AuthenticationService;
import com.thesurvey.api.service.SurveyService;
import com.thesurvey.api.service.UserService;
import com.thesurvey.api.service.mapper.UserMapper;
import java.util.UUID;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
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

    @Test
    void testMockRegister() throws Exception {
        MvcResult result = mockRegister(globalRegisterDto, true);
        JSONObject content = new JSONObject(result.getResponse().getContentAsString());

        assertThat(content.get("name")).isEqualTo(globalRegisterDto.getName());
        assertThat(content.get("role")).isEqualTo(globalRole);
        assertThat(content.get("email")).isEqualTo(globalRegisterDto.getEmail());
        assertThat(content.get("profileImage")).isEqualTo(globalRegisterDto.getProfileImage());
    }

    @Test
    void testMockLogin() throws Exception {
        authenticationService.register(globalRegisterDto);
        MvcResult result = mockLogin(globalLoginDto, true);
        JSONObject content = new JSONObject(result.getResponse().getContentAsString());

        assertThat(content.get("name")).isEqualTo(globalName);
        assertThat(content.get("email")).isEqualTo(globalEmail);
        assertThat(content.get("role")).isEqualTo(globalRole);
        assertThat(content.get("profileImage")).isEqualTo(globalProfileImage);
    }

    @Test
    void testPasswordFormat() throws Exception {
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

        for (String password : invalidPasswords) {
            String uniqueId = UUID.randomUUID().toString(); // To avoid duplicate user name or email

            UserRegisterRequestDto registerRequestDto = UserRegisterRequestDto.builder()
                .name(uniqueId + globalName)
                .email(uniqueId + globalEmail)
                .password(password)
                .phoneNumber(globalPhoneNumber)
                .address(globalAddress)
                .profileImage(globalProfileImage)
                .build();

            mockRegister(registerRequestDto, false);
        }

        for (String password : validPasswords) {
            String uniqueId = UUID.randomUUID().toString(); // To avoid duplicate user name or email

            UserRegisterRequestDto registerRequestDto = UserRegisterRequestDto.builder()
                .name(uniqueId + globalName)
                .email(uniqueId + globalEmail)
                .password(password)
                .phoneNumber(globalPhoneNumber)
                .address(globalAddress)
                .profileImage(globalProfileImage)
                .build();

            mockRegister(registerRequestDto, true);
        }
    }

    @Test
    void testPhoneNumberFormat() throws Exception {
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

        for (String phoneNumber : invalidPhoneNumbers) {
            String uniqueId = UUID.randomUUID().toString(); // To avoid duplicate user name or email

            UserRegisterRequestDto registerRequestDto = UserRegisterRequestDto.builder()
                .name(uniqueId + globalName)
                .email(uniqueId + globalEmail)
                .password(globalPassword)
                .phoneNumber(phoneNumber)
                .address(globalAddress)
                .profileImage(globalProfileImage)
                .build();

            mockRegister(registerRequestDto, false);
        }

        for (String phoneNumber : validPhoneNumbers) {
            String uniqueId = UUID.randomUUID().toString(); // To avoid duplicate user name or email

            UserRegisterRequestDto registerRequestDto = UserRegisterRequestDto.builder()
                .name(uniqueId + globalName)
                .email(uniqueId + globalEmail)
                .password(globalPassword)
                .phoneNumber(phoneNumber)
                .address(globalAddress)
                .profileImage(globalProfileImage)
                .build();

            mockRegister(registerRequestDto, true);
        }
    }

}
