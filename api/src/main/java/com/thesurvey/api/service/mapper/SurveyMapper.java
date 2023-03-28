package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyInfoDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.converter.CertificationTypeConverter;
import org.springframework.stereotype.Component;

@Component
public class SurveyMapper {

    private final SurveyRepository surveyRepository;
    private final CertificationTypeConverter certificationTypeConverter;

    public SurveyMapper(SurveyRepository surveyRepository,
        CertificationTypeConverter certificationTypeConverter) {
        this.surveyRepository = surveyRepository;
        this.certificationTypeConverter = certificationTypeConverter;
    }

    public SurveyInfoDto toSurveyInfoDto(Survey survey) {
        return SurveyInfoDto.builder()
            .surveyId(survey.getSurveyId())
            .title(survey.getTitle())
            .description(survey.getDescription())
            .startedDate(survey.getStartedDate())
            .endedDate(survey.getEndedDate())
            .certificationType(certificationTypeConverter.toCertificationTypeList(
                surveyRepository.findCertificationTypeBySurveyId(survey.getSurveyId())))
            .build();
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
