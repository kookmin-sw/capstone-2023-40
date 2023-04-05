package com.thesurvey.api.controller;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class UserControllerTest extends BaseControllerTest {

    // TODO: currently implementing
//    @Test
//    void testGetUserProfile() throws Exception {
//        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
//
//        MvcResult result = mockMvc.perform(get("/users/profile")
//                .with(authentication(authentication)))
//            .andExpect(status().isOk())
//            .andReturn();
//
//        // Check if the response contains the expected user information
//        JSONObject content = new JSONObject(result.getResponse().getContentAsString());
//        assertThat(content.get("name")).isEqualTo(user.getName());
//        assertThat(content.get("email")).isEqualTo(user.getEmail());
//        assertThat(content.get("phoneNumber")).isEqualTo(user.getPhoneNumber());
//        assertThat(content.get("address")).isEqualTo(user.getAddress());
//    }
}
