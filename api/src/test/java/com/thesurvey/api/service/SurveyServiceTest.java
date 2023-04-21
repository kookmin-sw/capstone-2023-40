package com.thesurvey.api.service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.QuestionBankUpdateRequestDto;
import com.thesurvey.api.dto.request.QuestionOptionRequestDto;
import com.thesurvey.api.dto.request.QuestionOptionUpdateRequestDto;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.exception.BadRequestExceptionMapper;
import com.thesurvey.api.exception.NotFoundExceptionMapper;
import com.thesurvey.api.repository.SurveyRepository;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class SurveyServiceTest {

    @Mock
    SurveyRepository surveyRepository;

    @InjectMocks
    SurveyService surveyService;

    User user;

    Authentication fakeAuthentication;

    @BeforeAll
    void setUpBeforeAll() {
        user = User.builder()
            .name("test")
            .email("test@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();

        // Fake authentication instance. Authentication is not guaranteed on these tests
        fakeAuthentication = new UsernamePasswordAuthenticationToken(null, null);
    }

    /**
     * Test validate for attempts to modify ended survey.
     */
    @Test
    void testValidateAttemptModifyEndedSurvey() {
        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(1L)
            .option("This is test update option")
            .description("This is test update option description")
            .build();

        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(1L)
            .title("This is test update question title")
            .description("This is test update question description")
            .questionNo(1)
            .questionOptions(List.of(questionOptionUpdateRequestDto))
            .build();

        Survey survey = Survey.builder()
            .title("This is test survey.")
            .authorId(1L)
            .description("This is test description.")
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .endedDate(LocalDateTime.now(
                ZoneId.of("Asia/Seoul"))) // set to before the startedDate of surveyUpdateRequestDto
            .build();

        SurveyUpdateRequestDto surveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .surveyId(UUID.randomUUID())
            .title("This is update test survey.")
            .description("This is update test description")
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .certificationTypes(List.of(CertificationType.KAKAO))
            .questions(List.of(questionBankUpdateRequestDto))
            .build();

        assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.validateUpdateSurvey(survey, surveyUpdateRequestDto));
    }

    /**
     * Test validate for if the 'startedDate' is more than 6 seconds before the current time.
     */
    @Test
    void testValidateCreateAfter5Seconds() {
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
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul"))
                .minusSeconds(6)) // set to before current time for 5 seconds
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(2))
            .certificationTypes(List.of(CertificationType.GOOGLE))
            .questions(List.of(questionRequestDto))
            .build();

        assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.createSurvey(fakeAuthentication, surveyRequestDto));
    }

    /**
     * Test validate for when the start time of the survey is set after the end time.
     */
    @Test
    void testValidateSurveyStartTimeSetAfterEndTime() {
        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(1L)
            .option("This is test update option")
            .description("This is test update option description")
            .build();

        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(1L)
            .title("This is test update question title")
            .description("This is test update question description")
            .questionNo(1)
            .questionOptions(List.of(questionOptionUpdateRequestDto))
            .build();

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
            .startedDate(
                LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(100)) // set to after endedDate
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(1))
            .certificationTypes(List.of(CertificationType.GOOGLE))
            .questions(List.of(questionRequestDto))
            .build();

        Survey survey = Survey.builder()
            .title("This is test survey.")
            .authorId(1L)
            .description("This is test description.")
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .endedDate(LocalDateTime.now(
                ZoneId.of("Asia/Seoul")).plusDays(100))
            .build();

        SurveyUpdateRequestDto surveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .surveyId(UUID.randomUUID())
            .title("This is update test survey.")
            .description("This is update test description")
            .startedDate(
                LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(100)) // set to after endedDate
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(1))
            .certificationTypes(List.of(CertificationType.KAKAO))
            .questions(List.of(questionBankUpdateRequestDto))
            .build();

        assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.createSurvey(fakeAuthentication, surveyRequestDto));
        assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.validateUpdateSurvey(survey, surveyUpdateRequestDto));
    }

    /**
     * Test validate for when to modify a survey that has already been started.
     */
    @Test
    void testValidateModifySurveyAlreadyStarted() {
        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(1L)
            .option("This is test update option")
            .description("This is test update option description")
            .build();

        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(1L)
            .title("This is test update question title")
            .description("This is test update question description")
            .questionNo(1)
            .questionOptions(List.of(questionOptionUpdateRequestDto))
            .build();

        Survey survey = Survey.builder()
            .title("This is test survey.")
            .authorId(1L)
            .description("This is test description.")
            .startedDate(LocalDateTime.now(ZoneId.of(
                    "Asia/Seoul"))
                .minusSeconds(5)) // set to the current time to create a survey that already started
            .endedDate(LocalDateTime.now(
                ZoneId.of("Asia/Seoul")).plusDays(100))
            .build();

        SurveyUpdateRequestDto surveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .surveyId(UUID.randomUUID())
            .title("This is update test survey.")
            .description("This is update test description")
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(10))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusDays(100))
            .certificationTypes(List.of(CertificationType.KAKAO))
            .questions(List.of(questionBankUpdateRequestDto))
            .build();

        assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.validateUpdateSurvey(survey, surveyUpdateRequestDto));
    }

    @Test
    void testValidateInvalidPageNumber() {
        // given
        Survey survey = Survey.builder()
            .title("This is test survey.")
            .authorId(1L)
            .description("This is test description.")
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .endedDate(LocalDateTime.now(
                ZoneId.of("Asia/Seoul")).plusDays(100))
            .build();

        // when
        Page<Survey> testSurveyPage = new PageImpl<>(List.of(survey));
        when(surveyRepository.findAllInDescendingOrder(any())).thenReturn(testSurveyPage);

        // then
        assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.getAllSurvey(-1));
        assertThrows(NotFoundExceptionMapper.class,
            () -> surveyService.getAllSurvey(100));
    }

}
