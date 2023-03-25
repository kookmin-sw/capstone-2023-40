package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import java.util.Optional;
import org.springframework.stereotype.Component;

// @formatter:off
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

    public Survey toSurvey(SurveyDto surveyDto) {
        return Survey
            .builder()
            .title(surveyDto.getTitle())
            .description(surveyDto.getDescription())
            .startedDate(surveyDto.getStartedDate())
            .endedDate(surveyDto.getEndedDate())
            .build();
    }
}
// @formatter:on