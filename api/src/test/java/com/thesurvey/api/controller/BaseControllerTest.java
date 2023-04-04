package com.thesurvey.api.controller;


import com.thesurvey.api.domain.EnumTypeEntity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thesurvey.api.dto.request.UserLoginRequestDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public abstract class BaseControllerTest {

    String globalName = "test name";

    String globalEmail = "test@gmail.com";

    String globalAddress = "test address";

    Role globalRole = Role.valueOf("USER");

    String globalPhoneNumber = "01012345678";

    String globalPassword = "Password123@";

    // Image size: 605 kB;
    String globalProfileImage = "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/hubble_m14_wfc3_1flat_cont_final.jpg";

    UserRegisterRequestDto globalRegisterDto = UserRegisterRequestDto.builder()
        .name(globalName)
        .email(globalEmail)
        .password(globalPassword)
        .phoneNumber(globalPhoneNumber)
        .role(globalRole)
        .profileImage(globalProfileImage)
        .address(globalAddress)
        .build();

    UserLoginRequestDto globalLoginDto = UserLoginRequestDto.builder()
        .email(globalEmail)
        .password(globalPassword)
        .build();

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    protected MvcResult mockRegister(UserRegisterRequestDto registerRequestDto, boolean isSuccess)
        throws Exception {
        ResultActions resultActions = mockMvc.perform(post("/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(registerRequestDto)));

        return isSuccess ? resultActions.andExpect(status().isOk()).andReturn()
            : resultActions.andExpect(status().isBadRequest()).andReturn();
    }

    protected MvcResult mockLogin(UserLoginRequestDto loginRequestDto, boolean isSuccess)
        throws Exception {
        ResultActions resultActions = mockMvc.perform(post("/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(loginRequestDto)));

        return isSuccess ? resultActions.andExpect(status().isOk()).andReturn()
            : resultActions.andExpect(status().isBadRequest()).andReturn();
    }
}
