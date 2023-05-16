package com.thesurvey.api.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.answeredQuestion.AnsweredQuestionDto;
import com.thesurvey.api.dto.request.answeredQuestion.AnsweredQuestionRequestDto;
import com.thesurvey.api.dto.request.question.QuestionOptionRequestDto;
import com.thesurvey.api.dto.request.question.QuestionRequestDto;
import com.thesurvey.api.dto.request.survey.SurveyRequestDto;
import com.thesurvey.api.dto.request.user.UserCertificationUpdateRequestDto;
import com.thesurvey.api.dto.request.user.UserLoginRequestDto;
import com.thesurvey.api.dto.request.user.UserRegisterRequestDto;
import com.thesurvey.api.dto.request.user.UserUpdateRequestDto;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.AuthenticationService;
import com.thesurvey.api.service.UserService;
import com.thesurvey.api.util.UserUtil;
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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
    void testGetUserCertifications() throws Exception {
        MvcResult result = mockMvc.perform(get("/users/profile/certifications")
                .with(authentication(authentication)))
            .andExpect(status().isOk())
            .andReturn();
        JSONObject content = new JSONObject(result.getResponse().getContentAsString());
        JSONArray certificationInfoList = content.getJSONArray("certificationInfoList");
        assertThat(certificationInfoList.length()).isEqualTo(0);

    }

    @Test
    void testUpdateUserCertifications() throws Exception {
        // given
        UserCertificationUpdateRequestDto userCertificationUpdateRequestDto = UserCertificationUpdateRequestDto.builder()
            .isKakaoCertificated(true)
            .isNaverCertificated(true)
            .isGoogleCertificated(false)
            .isWebMailCertificated(true)
            .isDriverLicenseCertificated(false)
            .isIdentityCardCertificated(true)
            .build();

        // when
        MvcResult result = mockMvc.perform(patch("/users/profile/certifications")
                .with(authentication(authentication))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userCertificationUpdateRequestDto)))
            .andExpect(status().isOk())
            .andReturn();

        // then
        JSONObject content = new JSONObject(result.getResponse().getContentAsString());
        JSONArray certificationInfoList = content.getJSONArray("certificationInfoList");
        assertThat(certificationInfoList.length()).isEqualTo(4);
    }

    @Test
    void testGetUserCreatedSurvey() throws Exception {
        // given
        QuestionOptionRequestDto questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option("This is test option")
            .description("This is test option description")
            .build();

        QuestionRequestDto questionRequestDto = QuestionRequestDto.builder()
            .title("This is test question title")
            .description("This is test question description")
            .questionNo(1)
            .questionType(QuestionType.SINGLE_CHOICE)
            .questionOptions(List.of(questionOptionRequestDto))
            .isRequired(true)
            .build();

        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title("This is test survey title")
            .description("This is test survey description")
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(1))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(2))
            .certificationTypes(List.of(CertificationType.GOOGLE))
            .questions(List.of(questionRequestDto))
            .build();
        mockCreateSurvey(surveyRequestDto);

        // when
        MvcResult result = mockMvc.perform(get("/users/surveys")
                .with(authentication(authentication)))
            .andExpect(status().isOk())
            .andReturn();
        JSONArray content = new JSONArray(result.getResponse().getContentAsString());
        JSONObject userCreatedSurvey = content.getJSONObject(0);

        // then
        assertThat(content.length()).isEqualTo(1);
        assertThat(userCreatedSurvey.get("title")).isEqualTo(surveyRequestDto.getTitle());
    }

    @Test
    void testGetUserCreatedSurveyResult() throws Exception {
        // given
        QuestionOptionRequestDto questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option("This is test option")
            .description("This is test option description")
            .build();

        QuestionRequestDto questionRequestDto = QuestionRequestDto.builder()
            .title("This is test question title")
            .description("This is test question description")
            .questionNo(1)
            .questionType(QuestionType.SINGLE_CHOICE)
            .questionOptions(List.of(questionOptionRequestDto))
            .isRequired(true)
            .build();

        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title("This is test survey title")
            .description("This is test survey description")
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(2))
            .certificationTypes(List.of(CertificationType.GOOGLE))
            .questions(List.of(questionRequestDto))
            .build();

        MvcResult createdSurvey = mockCreateSurvey(surveyRequestDto);
        JSONObject createdSurveyContent = new JSONObject(
            createdSurvey.getResponse().getContentAsString());

        mockMvc.perform(get("/auth/logout"))
            .andExpect(status().isOk());

        UserRegisterRequestDto submitAnswerUserRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("submitAnswerUser")
            .email("submitAnswerUserUser@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();
        mockRegister(submitAnswerUserRegisterRequestDto, true);

        UserLoginRequestDto submitAnswerUserLoginRequestDto = UserLoginRequestDto.builder()
            .email("submitAnswerUserUser@gmail.com")
            .password("Password40@")
            .build();
        mockLogin(submitAnswerUserLoginRequestDto, true);

        JSONArray questions = createdSurveyContent.getJSONArray("questions");
        JSONObject questionBank = questions.getJSONObject(0);
        JSONArray questionOptions = questionBank.getJSONArray("questionOptions");
        JSONObject questionOption = questionOptions.getJSONObject(0);
        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .questionBankId(questionBank.getLong("questionBankId"))
            .singleChoice(questionOption.getLong("questionOptionId"))
            .build();

        AnsweredQuestionRequestDto answeredQuestionRequestDto = AnsweredQuestionRequestDto.builder()
            .surveyId(UUID.fromString(createdSurveyContent.get("surveyId").toString()))
            .answers(List.of(answeredQuestionDto))
            .build();

        Authentication submitUserAuthentication = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(submitAnswerUserLoginRequestDto.getEmail(),
                submitAnswerUserLoginRequestDto.getPassword())
        );

        UserCertificationUpdateRequestDto userCertificationUpdateRequestDto = UserCertificationUpdateRequestDto.builder()
            .isKakaoCertificated(true)
            .isNaverCertificated(true)
            .isGoogleCertificated(true)
            .isWebMailCertificated(true)
            .isDriverLicenseCertificated(false)
            .isIdentityCardCertificated(true)
            .build();

        mockMvc.perform(patch("/users/profile/certifications")
                .with(authentication(submitUserAuthentication))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userCertificationUpdateRequestDto)))
            .andExpect(status().isOk());

        mockMvc.perform(post("/surveys/submit")
                .with(authentication(submitUserAuthentication))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(answeredQuestionRequestDto)))
            .andExpect(status().isNoContent());

        mockMvc.perform(get("/auth/logout"))
            .andExpect(status().isOk());

        UserLoginRequestDto userLoginRequestDto = UserLoginRequestDto.builder()
            .email("controllerUser@gmail.com")
            .password("Password40@")
            .build();
        mockLogin(userLoginRequestDto, true);

        // when
        MvcResult result = mockMvc.perform(
                get("/users/surveys/" + createdSurveyContent.get("surveyId"))
                    .with(authentication(authentication)))
            .andExpect(status().isOk())
            .andReturn();

        // then
        JSONObject contents = new JSONObject(result.getResponse().getContentAsString());
        JSONArray surveyResults = contents.getJSONArray("results");
        JSONObject questionAnswer = surveyResults.getJSONObject(0);
        assertThat(contents.get("surveyTitle")).isEqualTo(
            surveyRequestDto.getTitle());
        assertThat(questionAnswer.get("questionTitle")).isEqualTo(
            questionRequestDto.getTitle());

        JSONArray optionAnswers = questionAnswer.getJSONArray("optionAnswers");
        JSONObject optionAnswer = optionAnswers.getJSONObject(0);
        assertThat(optionAnswer.get("option")).isEqualTo(questionOptionRequestDto.getOption());
        assertThat(optionAnswer.get("totalResponseCount")).isEqualTo(1);
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