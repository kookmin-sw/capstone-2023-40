package com.thesurvey.api.controller;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.UserLoginRequestDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.dto.request.UserUpdateRequestDto;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.AuthenticationService;
import com.thesurvey.api.service.UserService;
import com.thesurvey.api.util.UserUtil;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@WithMockUser
public class UserControllerTest extends BaseControllerTest {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    Authentication authentication;

    @BeforeAll
    void setupBeforeAll() throws Exception {
        UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("controllerUser")
            .email("controllerUser@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();
        mockRegister(userRegisterRequestDto, true);
    }

    @BeforeEach
    void setupBeforeEach() throws Exception {
        UserLoginRequestDto userLoginRequestDto = UserLoginRequestDto.builder()
            .email("controllerUser@gmail.com")
            .password("Password40@")
            .build();
        mockLogin(userLoginRequestDto, true);

        authentication = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(userLoginRequestDto.getEmail(),
                userLoginRequestDto.getPassword())
        );
    }

    @Test
    void testGetUserProfile() throws Exception {
        // given
        User user = UserUtil.getUserFromAuthentication(authentication);

        // when
        MvcResult result = mockMvc.perform(get("/users/profile")
                .with(authentication(authentication)))
            .andExpect(status().isOk())
            .andReturn();
        JSONObject content = new JSONObject(result.getResponse().getContentAsString());

        // then
        assertThat(authentication.isAuthenticated()).isTrue();
        assertThat(authentication.getName()).isEqualTo(content.get("name"));
        assertThat(user.getUserId()).isEqualTo(content.getLong("userId"));
        assertThat(user.getPhoneNumber()).isEqualTo(content.get("phoneNumber"));
    }

    @Test
    void testUpdateUserProfile() throws Exception {
        // given
        User user = UserUtil.getUserFromAuthentication(authentication);
        UserUpdateRequestDto userUpdateRequestDto = UserUpdateRequestDto.builder()
            .address("Updated address")
            .phoneNumber("01699999999")
            .build();

        // when
        MvcResult result = mockMvc.perform(patch("/users/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userUpdateRequestDto)))
            .andExpect(status().isOk())
            .andReturn();
        JSONObject content = new JSONObject(result.getResponse().getContentAsString());

        // then
        assertThat(authentication.isAuthenticated()).isTrue();
        assertThat(user.getName()).isEqualTo(content.get("name"));
        assertThat(user.getEmail()).isEqualTo(content.get("email"));
        assertThat(userUpdateRequestDto.getAddress()).isEqualTo(content.get("address"));
        assertThat(userUpdateRequestDto.getPhoneNumber()).isEqualTo(content.get("phoneNumber"));
    }

    @Test
    void testDeleteUser() throws Exception {
        // given
        Long userId = UserUtil.getUserIdFromAuthentication(authentication);

        // when
        mockMvc.perform(delete("/users")).andExpect(status().isNoContent());

        // then
        assertThat(authentication.isAuthenticated()).isTrue();
        assertThat(userRepository.findById(userId).isEmpty()).isTrue();
    }
}
