package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.response.QuestionBankResponseDto;
import com.thesurvey.api.dto.response.SurveyResponseDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.QuestionService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class SurveyMapper {

    private final SurveyRepository surveyRepository;
    private final QuestionService questionService;

    public SurveyMapper(SurveyRepository surveyRepository, QuestionService questionService) {
        this.surveyRepository = surveyRepository;
        this.questionService = questionService;
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
            .certificationTypes(toCertificationTypeList(
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

    public List<CertificationType> toCertificationTypeList(
        List<Integer> certificationTypeList) {
        return certificationTypeList.stream()
            .map(type -> {
                switch (type) {
                    case 0:
                        return CertificationType.KAKAO;
                    case 1:
                        return CertificationType.NAVER;
                    case 2:
                        return CertificationType.GOOGLE;
                    case 3:
                        return CertificationType.WEBMAIL;
                    case 4:
                        return CertificationType.DRIVER_LICENSE;
                    case 5:
                        return CertificationType.MOBILE_PHONE;
                    default:
                        return null;
                }
            })
            .collect(Collectors.toList());
    }
}
