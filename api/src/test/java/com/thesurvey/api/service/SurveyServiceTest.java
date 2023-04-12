package com.thesurvey.api.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.response.SurveyResponseDto;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class SurveyServiceTest {

    @Mock
    SurveyRepository surveyRepository;

    @Mock
    SurveyMapper surveyMapper;

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
    void testInvalidTimeRequest() {
        LocalDateTime currentTime = LocalDateTime.now();
        Survey startedDateIsBeforeCurrentSurvey = Survey.builder()
            .title("Survey that startedDate is before current time over 5 seconds.")
            .startedDate(LocalDateTime.now().minusSeconds(6))
            .build();

        Survey startDateIsAfterEndedDateSurvey = Survey.builder()
            .title("Survey that startedDate is after endedDate")
            .startedDate(LocalDateTime.now().plusHours(2))
            .endedDate(LocalDateTime.now().plusHours(1))
            .build();

        assertThrows(ExceptionMapper.class, () -> surveyService.validateRequestedSurveyDate(
            startedDateIsBeforeCurrentSurvey.getStartedDate(), currentTime));
        assertThrows(ExceptionMapper.class, () -> surveyService.validateRequestedSurveyDate(
            startDateIsAfterEndedDateSurvey.getStartedDate(),
            startDateIsAfterEndedDateSurvey.getEndedDate()));
    }
}
