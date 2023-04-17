package com.thesurvey.api.controller;

import com.thesurvey.api.dto.request.SurveyRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thesurvey.api.dto.request.UserLoginRequestDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

public abstract class BaseControllerTest {

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

    protected MvcResult mockCreateSurvey(SurveyRequestDto surveyRequestDto)
        throws Exception {
        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/surveys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(surveyRequestDto)));

        return resultActions.andExpect(status().isOk()).andReturn();
    }

}
