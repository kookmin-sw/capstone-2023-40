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
    private final QuestionService questionService;
    private final CertificationTypeConverter certificationTypeConverter;

    public SurveyMapper(SurveyRepository surveyRepository, QuestionService questionService,
        CertificationTypeConverter certificationTypeConverter) {
        this.surveyRepository = surveyRepository;
        this.questionService = questionService;
        this.certificationTypeConverter = certificationTypeConverter;
    }

    public SurveyResponseDto toSurveyResponseDto(Survey survey) {
        return SurveyResponseDto.builder()
            .surveyId(survey.getSurveyId())
            .authorId(survey.getAuthorId())
            .title(survey.getTitle())
            .description(survey.getDescription())
            .startedDate(survey.getStartedDate())
            .endedDate(survey.getEndedDate())
            .createdDate(survey.getCreatedDate())
            .modifiedDate(survey.getModifiedDate())
            .certificationTypes(certificationTypeConverter.toCertificationTypeList(
                surveyRepository.findCertificationTypeBySurveyId(survey.getSurveyId())))
            .build();
    }

    public SurveyResponseDto toSurveyResponseDto(Survey survey, Long authorId) {
        List<QuestionBankResponseDto> questionBankResponseDtoList = questionService.getQuestionBankInfoDtoListBySurveyId(
            survey.getSurveyId());

        return SurveyResponseDto.builder()
            .surveyId(survey.getSurveyId())
            .authorId(authorId)
            .title(survey.getTitle())
            .description(survey.getDescription())
            .startedDate(survey.getStartedDate())
            .endedDate(survey.getEndedDate())
            .createdDate(survey.getCreatedDate())
            .modifiedDate(survey.getModifiedDate())
            .certificationTypes(certificationTypeConverter.toCertificationTypeList(
                    surveyRepository.findCertificationTypeBySurveyId(survey.getSurveyId())))
            .questions(questionBankResponseDtoList)
            .build();
    }

    public Survey toSurvey(SurveyRequestDto surveyRequestDto, Long authorId) {
        return Survey
            .builder()
            .authorId(authorId)
            .title(surveyRequestDto.getTitle().trim())
            .description(surveyRequestDto.getDescription().trim())
            .startedDate(surveyRequestDto.getStartedDate())
            .endedDate(surveyRequestDto.getEndedDate())
            .build();
    }

}
