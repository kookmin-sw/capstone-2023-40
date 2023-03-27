package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class SurveyMapper {

    public Optional<SurveyDto> toSurveyDto(Optional<Survey> survey) {
        return survey
            .map(value -> SurveyDto.builder()
                .surveyId(value.getSurveyId())
                .title(value.getTitle())
                .startedDate(value.getStartedDate())
                .endedDate(value.getEndedDate())
                .description(value.getDescription())
                .build());
    }

    public Survey toSurvey(SurveyRequestDto surveyRequestDto) {
        return Survey
            .builder()
            .title(surveyRequestDto.getTitle())
            .description(surveyRequestDto.getDescription())
            .startedDate(surveyRequestDto.getStartedDate())
            .endedDate(surveyRequestDto.getEndedDate())
            .build();
    }
}
