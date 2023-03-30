package com.thesurvey.api.service;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.response.SurveyResponseDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final SurveyMapper surveyMapper;
    private final QuestionService questionService;
    private final ParticipationService participationService;

    public SurveyService(SurveyRepository surveyRepository, SurveyMapper surveyMapper,
        QuestionService questionService,
        ParticipationService participationService) {
        this.surveyRepository = surveyRepository;
        this.surveyMapper = surveyMapper;
        this.questionService = questionService;
        this.participationService = participationService;
    }

    @Transactional(readOnly = true)
    public List<Optional<SurveyResponseDto>> getAllSurvey() {
        return surveyRepository.findAll().stream()
            .map((survey) -> Optional.ofNullable(surveyMapper.toSurveyResponseDto(survey)))
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SurveyResponseDto getSurveyBySurveyIdWithRelatedQuestion(UUID surveyId) {
        Survey survey = surveyRepository.findBySurveyId(surveyId)
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));
        return surveyMapper.toSurveyResponseDto(survey);
    }

    @Transactional
    public SurveyResponseDto createSurvey(Authentication authentication,
        SurveyRequestDto surveyRequestDto) {
        Survey survey = surveyRepository.save(surveyMapper.toSurvey(surveyRequestDto));
        questionService.createQuestion(surveyRequestDto, survey);
        participationService.createParticipation(authentication, surveyRequestDto, survey);
        return surveyMapper.toSurveyResponseDto(survey);
    }

    @Transactional
    public void deleteSurvey(UUID surveyId) {
        Survey survey = surveyRepository.findById(surveyId)
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND, surveyId));

        surveyRepository.delete(survey);
        participationService.deleteParticipation(surveyId);
        questionService.deleteQuestion(surveyId);
        // Need to implement.
//        List<AnsweredQuestion> answeredQuestionList = answeredQuestionRepository.findAllById_surveyId(surveyId);
//        answeredQuestionRepository.deleteAll(answeredQuestionList);
    }

    @Transactional
    public SurveyResponseDto updateSurvey(SurveyUpdateRequestDto surveyUpdateRequestDto) {
        Survey survey = surveyRepository.findBySurveyId(surveyUpdateRequestDto.getSurveyId())
            .orElseThrow(
                () -> new ExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND,
                    surveyUpdateRequestDto.getSurveyId()));

        /* If client tries to modify the survey already started,
            Can't update survey.
         */
        if (LocalDateTime.now(ZoneId.of("Asia/Seoul")).isAfter(survey.getStartedDate())) {
            throw new ExceptionMapper(ErrorMessage.SURVEY_ALREADY_STARTED);
        }

        if (surveyUpdateRequestDto.getTitle() != null) {
            survey.changeTitle(surveyUpdateRequestDto.getTitle());
        }
        if (surveyUpdateRequestDto.getDescription() != null) {
            survey.changeDescription(surveyUpdateRequestDto.getDescription());
        }
        if (surveyUpdateRequestDto.getStartedDate() != null) {
            survey.changeStartedDate(surveyUpdateRequestDto.getStartedDate());
        }
        if (surveyUpdateRequestDto.getEndedDate() != null) {
            survey.changeEndedDate(surveyUpdateRequestDto.getEndedDate());
        }

        questionService.updateQuestion(surveyUpdateRequestDto.getQuestions());
        surveyRepository.save(survey);
        return surveyMapper.toSurveyResponseDto(survey);
    }
}
