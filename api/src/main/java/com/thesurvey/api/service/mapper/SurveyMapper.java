package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.response.QuestionBankResponseDto;
import com.thesurvey.api.dto.response.SurveyListPageDto;
import com.thesurvey.api.dto.response.SurveyPageDto;
import com.thesurvey.api.dto.response.SurveyResponseDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.QuestionService;
import com.thesurvey.api.service.converter.CertificationTypeConverter;
import com.thesurvey.api.util.StringUtil;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
            .title(StringUtil.trim(surveyRequestDto.getTitle()))
            .description(StringUtil.trim(surveyRequestDto.getDescription().trim()))
            .startedDate(surveyRequestDto.getStartedDate())
            .endedDate(surveyRequestDto.getEndedDate())
            .build();
    }

    public SurveyPageDto toSurveyPageDto(Survey survey) {
        List<Integer> certificationTypes = surveyRepository.findCertificationTypeBySurveyId(
            survey.getSurveyId());
        return SurveyPageDto.builder()
            .surveyId(survey.getSurveyId())
            .authorId(survey.getAuthorId())
            .title(survey.getTitle())
            .description(survey.getDescription())
            .startedDate(survey.getStartedDate())
            .endedDate(survey.getEndedDate())
            .certificationTypes(
                certificationTypeConverter.toCertificationTypeList(certificationTypes))
            .modifiedDate(survey.getModifiedDate())
            .build();
    }

    public SurveyListPageDto toSurveyListPageDto(List<SurveyPageDto> surveyPageDto, Page<Survey> surveyPage) {
        Pageable surveyPageable = surveyPage.getPageable();
        return SurveyListPageDto.builder()
            .surveys(surveyPageDto)
            .page(surveyPageable.getPageNumber() + 1)
            .totalSurveys(surveyPage.getTotalElements())
            .totalPages(surveyPage.getTotalPages())
            .build();
    }
}
