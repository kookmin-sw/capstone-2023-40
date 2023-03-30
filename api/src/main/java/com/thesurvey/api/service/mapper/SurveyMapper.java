package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.response.QuestionBankResponseDto;
import com.thesurvey.api.dto.response.SurveyResponseDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.QuestionService;
import com.thesurvey.api.service.converter.CertificationTypeConverter;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class SurveyMapper {

    private final SurveyRepository surveyRepository;
    private final CertificationTypeConverter certificationTypeConverter;
    private final QuestionService questionService;

    public SurveyMapper(SurveyRepository surveyRepository,
        CertificationTypeConverter certificationTypeConverter, QuestionService questionService) {
        this.surveyRepository = surveyRepository;
        this.certificationTypeConverter = certificationTypeConverter;
        this.questionService = questionService;
    }

    public SurveyResponseDto toSurveyResponseDto(Survey survey) {
        List<QuestionBankResponseDto> questionBankResponseDtoList = questionService.getQuestionBankInfoDtoListBySurveyId(
            survey.getSurveyId());

        return SurveyResponseDto.builder()
            .surveyId(survey.getSurveyId())
            .title(survey.getTitle())
            .description(survey.getDescription())
            .startedDate(survey.getStartedDate())
            .endedDate(survey.getEndedDate())
            .certificationType(certificationTypeConverter.toCertificationTypeList(
                surveyRepository.findCertificationTypeBySurveyId(survey.getSurveyId())))
            .questions(questionBankResponseDtoList)
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
