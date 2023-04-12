package com.thesurvey.api.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.dto.response.SurveyResponseDto;
import com.thesurvey.api.exception.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@ExtendWith(MockitoExtension.class)
public class SurveyServiceTest {

    @Mock
    SurveyRepository surveyRepository;

    @Mock
    SurveyMapper surveyMapper;

    @Mock
    UserRepository userRepository;

    @Mock
    QuestionService questionService;

    @Mock
    ParticipationService participationService;

    @Mock
    ParticipationRepository participationRepository;

    @InjectMocks
    SurveyService surveyService;

    @Test
    public void testGetAllSurveyWithRetrievingInOrder() {
        // given
        Survey oldSurvey = Survey.builder()
            .title("Old survey title")
            .build();

        Survey latestSurvey = Survey.builder()
            .title("Latest survey title")
            .build();

        SurveyResponseDto oldSurveyResponseDto = SurveyResponseDto.builder()
            .title("Old survey title")
            .createdDate(LocalDateTime.now().minusDays(1))
            .build();

        SurveyResponseDto latestSurveyResponseDto = SurveyResponseDto.builder()
            .title("Latest survey title")
            .createdDate(LocalDateTime.now().plusDays(1))
            .build();

        List<Survey> testSurveyList = Arrays.asList(latestSurvey, oldSurvey);
        when(surveyRepository.findAllInDescendingOrder()).thenReturn(testSurveyList);
        when(surveyMapper.toSurveyResponseDto(oldSurvey)).thenReturn(oldSurveyResponseDto);
        when(surveyMapper.toSurveyResponseDto(latestSurvey)).thenReturn(latestSurveyResponseDto);

        // when
        List<SurveyResponseDto> resultSurveys = surveyService.getAllSurvey();

        // then
        assertNotNull(resultSurveys);
        assertThat(resultSurveys.get(0).getCreatedDate()).isAfter(
            resultSurveys.get(1).getCreatedDate());
    }

    @Test
    void testCorrectCreateSurveyRequest() {
        // given
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            "test", "test");

        SurveyRequestDto testSurveyRequestDto = SurveyRequestDto.builder()
            .title("test survey title")
            .startedDate(LocalDateTime.now().plusDays(1))
            .endedDate(LocalDateTime.now().plusDays(2))
            .build();

        SurveyResponseDto expectSurveyResponseDto = SurveyResponseDto.builder()
            .title("test survey title")
            .build();

        doNothing().when(questionService).createQuestion(any(), any());
        doNothing().when(participationService).createParticipation(any(), any(), any());
        when(surveyMapper.toSurveyResponseDto(any())).thenReturn(expectSurveyResponseDto);

        // when
        SurveyResponseDto result = surveyService.createSurvey(authentication, testSurveyRequestDto);

        // then
        assertEquals(expectSurveyResponseDto.getTitle(), result.getTitle());

    }

    @Test
    void testCorrectUpdateSurveyRequest() {
        // given
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            "test", "test");

        Survey testSurvey = Survey.builder()
            .title("test survey")
            .description("test survey description")
            .startedDate(LocalDateTime.now().plusDays(1))
            .endedDate(LocalDateTime.now().plusDays(2))
            .build();

        User testUser = User.builder()
            .name("test user")
            .build();

        SurveyUpdateRequestDto surveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .title("test update survey")
            .description("test update survey description")
            .startedDate(LocalDateTime.now().plusDays(3))
            .endedDate(LocalDateTime.now().plusDays(4))
            .build();

        SurveyResponseDto updatedSurveyDto = SurveyResponseDto.builder()
            .title("test update survey")
            .description("test update survey description")
            .startedDate(LocalDateTime.now().plusDays(3))
            .endedDate(LocalDateTime.now().plusDays(4))
            .build();

        when(surveyRepository.findById(surveyUpdateRequestDto.getSurveyId())).thenReturn(
            Optional.ofNullable(testSurvey));
        when(userRepository.findByName(authentication.getName())).thenReturn(
            Optional.ofNullable(testUser));
        when(participationRepository.existsByUserIdAndSurveyId(any(), any())).thenReturn(true);
        when(surveyMapper.toSurveyResponseDto(any())).thenReturn(updatedSurveyDto);
        doNothing().when(questionService).updateQuestion(any());

        // when
        SurveyResponseDto resultSurveyDto = surveyService.updateSurvey(authentication,
            surveyUpdateRequestDto);

        // then
        assertEquals(updatedSurveyDto.getTitle(), resultSurveyDto.getTitle());

    }

    @Test
    void testValidateCreateSurveyWithInvalidTimeRequest() {
        // given
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            "test", "test");

        SurveyRequestDto testSurveyRequestDto = SurveyRequestDto.builder()
            .title("Survey that startedDate is After endedDate.")
            .startedDate(LocalDateTime.now().plusDays(1)) // set after endedDate
            .endedDate(LocalDateTime.now().minusDays(1))
            .build();

        // when
        BadRequestExceptionMapper result = assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.createSurvey(authentication,
                testSurveyRequestDto));

        // then
        assertEquals(ErrorMessage.STARTEDDATE_ISAFTER_ENDEDDATE.getMessage(), result.getMessage());
    }

    @Test
    void testValidateCreateSurveyWithOverFiveSeconds() {
        // given
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            "test", "test");

        SurveyRequestDto testSurveyRequestDto = SurveyRequestDto.builder()
            .title("Survey that startedDate is before current time over 5 seconds.")
            .startedDate(LocalDateTime.now().minusSeconds(6))
            .build();

        // when
        BadRequestExceptionMapper result = assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.createSurvey(authentication,
                testSurveyRequestDto));

        // then
        assertEquals(ErrorMessage.STARTEDDATE_ISBEFORE_CURRENTDATE.getMessage(), result.getMessage());

    }

    @Test
    void testValidateUpdateSurveyAlreadyStarted() {
        // given
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            "test", "test");

        SurveyUpdateRequestDto testSurveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .title("test survey update request dto")
            .build();

        Survey testSurvey = Survey.builder()
            .title("test survey")
            .startedDate(LocalDateTime.now()
                .minusDays(1))  // set for survey that have already been started
            .endedDate(LocalDateTime.now().plusDays(1))
            .build();

        User testUser = User.builder()
            .name("test user")
            .build();

        when(surveyRepository.findById(any())).thenReturn(Optional.ofNullable(testSurvey));
        when(userRepository.findByName(any())).thenReturn(Optional.ofNullable(testUser));
        when(participationRepository.existsByUserIdAndSurveyId(any(), any())).thenReturn(true);

        // when
        BadRequestExceptionMapper result = assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.updateSurvey(authentication,
                testSurveyUpdateRequestDto));

        // then
        assertEquals(ErrorMessage.SURVEY_ALREADY_STARTED.getMessage(), result.getMessage());
    }

    @Test
    void testValidateUpdateSurveyWithInvalidTimeRequest() {
        // given
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            "test", "test");

        SurveyUpdateRequestDto testSurveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .title("test survey update request dto")
            .startedDate(LocalDateTime.now().plusDays(5)) // set after endedDate
            .endedDate(LocalDateTime.now().plusDays(4))
            .build();

        Survey testSurvey = Survey.builder()
            .title("test survey")
            .startedDate(LocalDateTime.now().plusDays(1))
            .endedDate(LocalDateTime.now().plusDays(2))
            .build();

        User testUser = User.builder()
            .name("test user")
            .build();

        when(surveyRepository.findById(any())).thenReturn(Optional.ofNullable(testSurvey));
        when(userRepository.findByName(any())).thenReturn(Optional.ofNullable(testUser));
        when(participationRepository.existsByUserIdAndSurveyId(any(), any())).thenReturn(true);

        // when
        BadRequestExceptionMapper result = assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.updateSurvey(authentication,
                testSurveyUpdateRequestDto));

        // then
        assertEquals(ErrorMessage.STARTEDDATE_ISAFTER_ENDEDDATE.getMessage(), result.getMessage());
    }

    @Test
    void testValidateUpdateSurveyAlreadyEnded() {
        // given
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            "test", "test");

        SurveyUpdateRequestDto testSurveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .title("test survey update request dto")
            .startedDate(LocalDateTime.now().plusDays(4))
            .endedDate(LocalDateTime.now().plusDays(5))
            .build();

        Survey testSurvey = Survey.builder()
            .title("test survey")
            .startedDate(LocalDateTime.now().minusDays(1))
            .endedDate(
                LocalDateTime.now().minusSeconds(10)) // set for survey that have already been ended
            .build();

        User testUser = User.builder()
            .name("test user")
            .build();

        when(surveyRepository.findById(any())).thenReturn(Optional.ofNullable(testSurvey));
        when(userRepository.findByName(any())).thenReturn(Optional.ofNullable(testUser));
        when(participationRepository.existsByUserIdAndSurveyId(any(), any())).thenReturn(true);

        // when
        BadRequestExceptionMapper result = assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.updateSurvey(authentication,
                testSurveyUpdateRequestDto));

        // then
        assertEquals(ErrorMessage.SURVEY_ALREADY_ENDED.getMessage(), result.getMessage());
    }

    @Test
    void testValidateDeleteSurveyAlreadyStarted() {
        // given
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            "test", "test");

        Survey testSurvey = Survey.builder()
            .title("test survey")
            .startedDate(LocalDateTime.now().minusDays(1))
            .endedDate(LocalDateTime.now().plusDays(10))
            .build();

        User testUser = User.builder()
            .name("test user")
            .build();

        when(surveyRepository.findById(any())).thenReturn(
            Optional.ofNullable(testSurvey));
        when(userRepository.findByName(any())).thenReturn(
            Optional.ofNullable(testUser));
        when(participationRepository.existsByUserIdAndSurveyId(any(), any())).thenReturn(true);

        // when
        BadRequestExceptionMapper result = assertThrows(BadRequestExceptionMapper.class,
            () -> surveyService.deleteSurvey(authentication,
                UUID.randomUUID()));

        // then
        assertEquals(ErrorMessage.SURVEY_ALREADY_STARTED.getMessage(), result.getMessage());

    }

}
