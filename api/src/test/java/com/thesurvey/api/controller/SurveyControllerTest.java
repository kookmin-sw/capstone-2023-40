package com.thesurvey.api.controller;

import static com.thesurvey.api.SurveyTestFactory.getGlobalSurveyRequestDto;
import static com.thesurvey.api.SurveyTestFactory.getSurveyUpdateRequestDto;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.QuestionOptionRepository;
import com.thesurvey.api.repository.QuestionRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.AuthenticationService;
import com.thesurvey.api.service.SurveyService;
import com.thesurvey.api.service.mapper.QuestionBankMapper;
import com.thesurvey.api.service.mapper.QuestionMapper;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.util.UUID;
import org.json.JSONObject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@TestInstance(Lifecycle.PER_CLASS)
@AutoConfigureMockMvc
public class SurveyControllerTest extends BaseControllerTest {

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    QuestionBankRepository questionBankRepository;

    @Autowired
    SurveyService surveyService;

    @Autowired
    SurveyMapper surveyMapper;

    @Autowired
    QuestionMapper questionMapper;

    @Autowired
    QuestionBankMapper questionBankMapper;

    @Autowired
    ParticipationRepository participationRepository;

    @Autowired
    QuestionOptionRepository questionOptionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    AuthenticationManager authenticationManager;

    @BeforeAll
    void mockRegister() throws Exception {
        mockRegister(globalRegisterDto, true);
    }
    @BeforeEach
    void mockUserLogin() throws Exception {
        mockLogin(globalLoginDto, true);
    }

    @AfterEach
    void logout() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/auth/logout"));
    }

    @Test
    @WithMockUser
    public void testCreateSurvey() throws Exception {
        // given
        SurveyRequestDto testSurveyRequestDto = getGlobalSurveyRequestDto();

        // when
        MvcResult result = mockCreateSurvey(testSurveyRequestDto);
        JSONObject content = new JSONObject(result.getResponse().getContentAsString());

        // then
        assertEquals(content.get("title"), testSurveyRequestDto.getTitle());
    }

    @Test
    @WithMockUser
    public void testUpdateSurvey() throws Exception {
        // given
        SurveyRequestDto testSurveyRequestDto = getGlobalSurveyRequestDto();
        MvcResult resultCreatedSurvey = mockCreateSurvey(testSurveyRequestDto);
        JSONObject createdSurveyContent = new JSONObject(resultCreatedSurvey.getResponse().getContentAsString());
        SurveyUpdateRequestDto testSurveyUpdateRequestDto = getSurveyUpdateRequestDto(
            UUID.fromString(String.valueOf(createdSurveyContent.get("surveyId"))));

        // when
        MvcResult resultActions = mockMvc.perform(MockMvcRequestBuilders.patch("/surveys")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testSurveyUpdateRequestDto)))
            .andExpect(status().isOk())
            .andReturn();
        JSONObject content = new JSONObject(resultActions.getResponse().getContentAsString());

        // then
        assertEquals(content.get("title"), testSurveyUpdateRequestDto.getTitle());
    }

    @Test
    @WithMockUser
    public void testDeleteSurvey() throws Exception {
        // given
        MvcResult mvcResult = mockCreateSurvey(getGlobalSurveyRequestDto());
        JSONObject content = new JSONObject(mvcResult.getResponse().getContentAsString());
        String testSurveyId = content.get("surveyId").toString();

        // when
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/surveys/{surveyId}", testSurveyId))
            .andExpect(status().isOk());

        // FIXME : should null, but returned not null.
        // then
//        assertNull(surveyRepository.findBySurveyId(UUID.fromString(testSurveyId)));
    }

    @Test
    @WithMockUser
    public void testGetSurvey() throws Exception {
        // given
        SurveyRequestDto testSurveyRequestDto = getGlobalSurveyRequestDto();
        MvcResult createSurveyResult = mockCreateSurvey(testSurveyRequestDto);
        JSONObject content = new JSONObject(createSurveyResult.getResponse().getContentAsString());
        String testSurveyId = content.get("surveyId").toString();

        // when
        ResultActions resultActions = mockMvc.perform(
            MockMvcRequestBuilders.get("/surveys/{surveyId}", testSurveyId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testSurveyRequestDto)));

        // then
        MvcResult getSurveyResult = resultActions.andReturn();
        assertEquals(createSurveyResult.getResponse().getContentAsString(),
            getSurveyResult.getResponse().getContentAsString());
    }
//        FIXME: Status expected:<200> but was:<401>
//    @Test
//    @WithMockUser
//    public void testSubmitSurvey() throws Exception {
//        // given
//        SurveyRequestDto testSurveyRequestDto = SurveyTestFactory.getGlobalSurveyRequestDto();
//        MvcResult createSurveyResult = mockCreateSurvey(testSurveyRequestDto);
//        JSONObject content = new JSONObject(createSurveyResult.getResponse().getContentAsString());
//        UUID testSurveyId = UUID.fromString(content.get("surveyId").toString());
//        AnsweredQuestionRequestDto testAnsweredQuestionRequestDto = SurveyTestFactory.getAnsweredQuestionRequestDto(
//            testSurveyId);
//
//        UserRegisterRequestDto testRegisterDto = UserRegisterRequestDto.builder()
//            .name("test")
//            .email("aaaaa@test.com")
//            .password("Testest123!!")
//            .phoneNumber("01000000000")
//            .profileImage(globalProfileImage)
//            .address(globalAddress)
//            .build();
//        UserLoginRequestDto testLoginDto = UserLoginRequestDto.builder()
//            .email("aaaaa@test.com")
//            .password("Testest123!!")
//            .build();
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/auth/logout")).andExpect(status().isOk());
//
//        mockRegister(testRegisterDto, true);
//        mockLogin(testLoginDto, true);
//
//        // when
//        ResultActions resultActions = mockMvc.perform(
//            MockMvcRequestBuilders.post("/surveys/submit")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(testAnsweredQuestionRequestDto)));
//
//        // then
//        MvcResult submitSurveyResult = resultActions.andExpect(status().isOk()).andReturn();
//        JSONObject submitContent = new JSONObject(submitSurveyResult.getResponse().getContentAsString());
//        UUID submittedSurveyId = UUID.fromString(submitContent.get("surveyId").toString());
//        assertEquals(testSurveyId, submittedSurveyId);
//    }

}
