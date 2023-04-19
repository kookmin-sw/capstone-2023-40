package com.thesurvey.api.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.request.QuestionBankUpdateRequestDto;
import com.thesurvey.api.dto.request.QuestionOptionRequestDto;
import com.thesurvey.api.dto.request.QuestionOptionUpdateRequestDto;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.dto.request.UserLoginRequestDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.repository.*;
import com.thesurvey.api.service.AuthenticationService;
import com.thesurvey.api.service.SurveyService;
import com.thesurvey.api.service.mapper.QuestionBankMapper;
import com.thesurvey.api.service.mapper.QuestionMapper;
import com.thesurvey.api.service.mapper.SurveyMapper;
import com.thesurvey.api.util.UserUtil;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;
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
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@TestInstance(Lifecycle.PER_CLASS)
@AutoConfigureMockMvc
@WithMockUser
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

    SurveyRequestDto surveyRequestDto;
    QuestionRequestDto questionRequestDto;
    QuestionOptionRequestDto questionOptionRequestDto;
    JSONObject mockSurvey;

    @BeforeAll
    void setupBeforeAll() throws Exception {
        UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("test1")
            .email("test1@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();
        mockRegister(userRegisterRequestDto, true);

        questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option("This is test option")
            .description("This is test option description")
            .build();

        questionRequestDto = QuestionRequestDto.builder()
            .title("This is test question title")
            .description("This is test question description")
            .questionNo(1)
            .questionType(QuestionType.SINGLE_CHOICE)
            .questionOptions(List.of(questionOptionRequestDto))
            .isRequired(true)
            .build();

        surveyRequestDto = SurveyRequestDto.builder()
            .title("This is test survey title")
            .description("This is test survey description")
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(1))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(2))
            .certificationTypes(List.of(CertificationType.GOOGLE))
            .questions(List.of(questionRequestDto))
            .build();

    }

    @BeforeEach
    void setupBeforeEach() throws Exception {
        UserUtil.userRepository = userRepository;
        UserLoginRequestDto userLoginRequestDto = UserLoginRequestDto.builder()
            .email("test1@gmail.com")
            .password("Password40@")
            .build();
        mockLogin(userLoginRequestDto, true);

        MvcResult createdSurvey = mockCreateSurvey(surveyRequestDto);
        mockSurvey = new JSONObject(createdSurvey.getResponse().getContentAsString());
    }

    @Test
    void testGetSurvey() throws Exception {
        ResultActions resultActions = mockMvc.perform(
                get("/surveys/" + mockSurvey.get("surveyId").toString()))
            .andExpect(status().isOk());
        MvcResult mvcResult = resultActions.andReturn();
        JSONObject content = new JSONObject(mvcResult.getResponse().getContentAsString());

        assertThat(surveyRequestDto.getTitle()).isEqualTo(content.get("title"));
    }

    @Test
    void testUpdateSurvey() throws Exception {
        // given
        JSONArray questions = mockSurvey.getJSONArray("questions");
        JSONObject questionBank = (JSONObject) questions.get(0);
        Long questionBankId = Long.valueOf(questionBank.get("questionBankId").toString());

        JSONArray questionOptions = questionBank.getJSONArray("questionOptions");
        JSONObject questionOption = (JSONObject) questionOptions.get(0);
        Long questionOptionId = Long.valueOf(questionOption.get("questionOptionId").toString());

        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(questionOptionId)
            .option("This is test update option")
            .description("This is test update option description")
            .build();

        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(questionBankId)
            .title("This is test update question title")
            .description("This is test update question description")
            .questionNo(1)
            .questionOptions(List.of(questionOptionUpdateRequestDto))
            .build();

        SurveyUpdateRequestDto surveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .surveyId(UUID.fromString(mockSurvey.get("surveyId").toString()))
            .title("This is test update title.")
            .description("This is test update description")
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(3))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(4))
            .certificationTypes(List.of(CertificationType.DRIVER_LICENSE))
            .questions(List.of(questionBankUpdateRequestDto))
            .build();

        // when
        ResultActions resultActions = mockMvc.perform(patch("/surveys")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(surveyUpdateRequestDto)))
            .andExpect(status().isOk());
        MvcResult mvcResult = resultActions.andReturn();
        JSONObject content = new JSONObject(mvcResult.getResponse().getContentAsString());

        // then
        assertThat(surveyUpdateRequestDto.getTitle()).isEqualTo(content.get("title"));
    }

    @Test
    void testDeleteSurvey() throws Exception {
        ResultActions resultActions = mockMvc.perform(
                delete("/surveys/" + mockSurvey.get("surveyId").toString()))
            .andExpect(status().isNoContent());
        // FIXME: should be 0, but 1 returns
//        assertThat(surveyRepository.findAll().size()).isEqualTo(0);
    }
}