package com.thesurvey.api.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.EnumTypeEntity.PointTransactionType;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.domain.PointHistory;
import com.thesurvey.api.dto.request.answeredQuestion.AnsweredQuestionDto;
import com.thesurvey.api.dto.request.answeredQuestion.AnsweredQuestionRequestDto;
import com.thesurvey.api.dto.request.question.QuestionOptionRequestDto;
import com.thesurvey.api.dto.request.question.QuestionRequestDto;
import com.thesurvey.api.dto.request.survey.SurveyRequestDto;
import com.thesurvey.api.dto.request.user.UserRegisterRequestDto;
import com.thesurvey.api.dto.response.question.QuestionBankResponseDto;
import com.thesurvey.api.dto.response.survey.SurveyResponseDto;
import com.thesurvey.api.dto.response.user.UserResponseDto;
import com.thesurvey.api.exception.mapper.BadRequestExceptionMapper;
import com.thesurvey.api.repository.PointHistoryRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.util.PointUtil;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
public class PointHistoryServiceTest {

    @Autowired
    PointHistoryRepository pointHistoryRepository;

    @Autowired
    PointHistoryService pointHistoryService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SurveyService surveyService;

    @Autowired
    AnsweredQuestionService answeredQuestionService;

    @Autowired
    PointUtil pointUtil;

    UserResponseDto testUserResponseDto;

    UserRegisterRequestDto userRegisterRequestDto;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    @BeforeAll
    void setupBeforeAll() {
        userRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("pointHistoryTest")
            .email("pointHistoryTest@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();
        testUserResponseDto = authenticationService.register(userRegisterRequestDto);
    }

    @Test
    void testValidateUserPoint() {
        List<QuestionRequestDto> testQuestionList = new ArrayList<>();
        // To increase the required points for creating a survey, 100 survey questions are generated
        int questionNo = 1;
        for (int i = 0; i < 100; i++) {
            testQuestionList.add(
                QuestionRequestDto.builder()
                    .title("This is test question title")
                    .description("This is test question description")
                    .questionNo(questionNo++)
                    .questionType(QuestionType.LONG_ANSWER)
                    .isRequired(true)
                    .build()
            );
        }

        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title("This is test survey title")
            .description("This is test survey description")
            .startedDate(LocalDateTime.parse(LocalDateTime.now(ZoneId.of("Asia/Seoul"))
                .format(formatter)))
            .endedDate(LocalDateTime.parse(LocalDateTime.now(ZoneId.of("Asia/Seoul"))
                .plusDays(2).format(formatter)))
            .certificationTypes(List.of(CertificationType.GOOGLE))
            .questions(testQuestionList)
            .build();

        Authentication authentication = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(userRegisterRequestDto.getEmail(),
                userRegisterRequestDto.getPassword())
        );
        assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.createSurvey(authentication,
                surveyRequestDto));
    }

    @Test
    void testUserTotalPointAfterCreateAnswer() {
        // given
        UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("pointHistoryTest2")
            .email("pointHistoryTest2@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();
        UserResponseDto testUserResponseDto =
            authenticationService.register(userRegisterRequestDto);

        List<QuestionRequestDto> testQuestionList = new ArrayList<>();
        testQuestionList.add(
            QuestionRequestDto.builder()
                .title("This is test long answer question title")
                .description("This is test long answer question description")
                .questionNo(1)
                .questionType(QuestionType.LONG_ANSWER)
                .isRequired(true)
                .build()
        );

        testQuestionList.add(
            QuestionRequestDto.builder()
                .title("This is test short answer question title")
                .description("This is test short answer question description")
                .questionNo(2)
                .questionType(QuestionType.SHORT_ANSWER)
                .isRequired(true)
                .build()
        );

        testQuestionList.add(
            QuestionRequestDto.builder()
                .title("This is test single choice question title")
                .description("This is test single choice question description")
                .questionNo(3)
                .questionType(QuestionType.SINGLE_CHOICE)
                .questionOptions(List.of(
                    QuestionOptionRequestDto.builder()
                        .option("test option title")
                        .description("test option description")
                        .build()
                ))
                .isRequired(true)
                .build()
        );

        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title("This is test survey title")
            .description("This is test survey description")
            .startedDate(LocalDateTime.parse(LocalDateTime.now(ZoneId.of("Asia/Seoul"))
                .format(formatter)))
            .endedDate(LocalDateTime.parse(LocalDateTime.now(ZoneId.of("Asia/Seoul"))
                .plusDays(2).format(formatter)))
            .certificationTypes(List.of(CertificationType.GOOGLE))
            .questions(testQuestionList)
            .build();

        Authentication authentication = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(userRegisterRequestDto.getEmail(),
                userRegisterRequestDto.getPassword())
        );

        // when
        surveyService.createSurvey(authentication, surveyRequestDto);

        // then
        assertEquals(pointHistoryService.getUserTotalPoint(testUserResponseDto.getUserId()),
            PointHistory.USER_INITIAL_POINT -
                (PointTransactionType.LONG_ANSWER_CONSUME.getTransactionPoint()
                    + PointTransactionType.SHORT_ANSWER_CONSUME.getTransactionPoint()
                    + PointTransactionType.SINGLE_CHOICE_CONSUME.getTransactionPoint()));
    }

    @Test
    void testUserTotalPointAfterSubmitAnswer() {
        // given
        UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("pointHistoryTest3")
            .email("pointHistoryTest3@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();
        authenticationService.register(userRegisterRequestDto);

        List<QuestionRequestDto> testQuestionList = new ArrayList<>();
        testQuestionList.add(
            QuestionRequestDto.builder()
                .title("This is test question title")
                .description("This is test question description")
                .questionNo(1)
                .questionType(QuestionType.LONG_ANSWER)
                .isRequired(true)
                .build()
        );

        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title("This is test survey title")
            .description("This is test survey description")
            .startedDate(LocalDateTime.parse(LocalDateTime.now(ZoneId.of("Asia/Seoul"))
                .format(formatter)))
            .endedDate(LocalDateTime.parse(LocalDateTime.now(ZoneId.of("Asia/Seoul"))
                .plusDays(2).format(formatter)))
            .certificationTypes(List.of(CertificationType.NONE))
            .questions(testQuestionList)
            .build();

        Authentication authentication = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(userRegisterRequestDto.getEmail(),
                userRegisterRequestDto.getPassword())
        );

        SurveyResponseDto testSurveyResponseDto = surveyService.createSurvey(authentication,
            surveyRequestDto);

        List<QuestionBankResponseDto> testQuestionResponseList =
            testSurveyResponseDto.getQuestions();

        UserRegisterRequestDto submitUserRequestDto = UserRegisterRequestDto.builder()
            .name("pointHistoryTest4")
            .email("pointHistoryTest4@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();

        UserResponseDto submitUserResponseDto =
            authenticationService.register(submitUserRequestDto);

        Authentication submitUserAuthentication = authenticationService.authenticate(
            new UsernamePasswordAuthenticationToken(submitUserRequestDto.getEmail(),
                submitUserRequestDto.getPassword()));

        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .questionBankId(testQuestionResponseList.get(0).getQuestionBankId())
            .longAnswer("test long answer")
            .isRequired(true)
            .questionType(QuestionType.LONG_ANSWER)
            .build();

        AnsweredQuestionRequestDto answeredQuestionRequestDto = AnsweredQuestionRequestDto.builder()
            .surveyId(testSurveyResponseDto.getSurveyId())
            .answers(List.of(answeredQuestionDto))
            .build();

        // when
        answeredQuestionService.createAnswer(submitUserAuthentication, answeredQuestionRequestDto);

        // then
        assertEquals(pointHistoryService.getUserTotalPoint(submitUserResponseDto.getUserId()),
            PointHistory.USER_INITIAL_POINT + PointTransactionType.LONG_ANSWER_REWARD.getTransactionPoint());
    }

}
