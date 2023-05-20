package com.thesurvey.api.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.request.question.QuestionRequestDto;
import com.thesurvey.api.dto.request.survey.SurveyRequestDto;
import com.thesurvey.api.dto.request.user.UserRegisterRequestDto;
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
import org.springframework.security.test.context.support.WithMockUser;

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
    PointUtil pointUtil;

    UserResponseDto testUserResponseDto;

    UserRegisterRequestDto userRegisterRequestDto;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    @BeforeAll
    void setupBeforeAll() {
        userRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("test")
            .email("test@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();
        testUserResponseDto = authenticationService.register(userRegisterRequestDto);
    }

    @Test
    @WithMockUser
    void testValidateUserPoint() {
        List<QuestionRequestDto> testQuestionList = new ArrayList<>();
        // To increase the required points for creating a survey, 100 survey questions are generated
        for (int i = 0; i < 100; i++) {
            testQuestionList.add(
                QuestionRequestDto.builder()
                    .title("This is test question title")
                    .description("This is test question description")
                    .questionNo(1)
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

}
