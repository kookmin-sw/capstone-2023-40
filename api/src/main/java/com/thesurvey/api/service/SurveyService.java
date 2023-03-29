package com.thesurvey.api.service;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyInfoDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
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

    public List<Optional<SurveyInfoDto>> getAllSurvey() {
        List<Survey> surveyList = surveyRepository.findAll();
        List<Optional<SurveyInfoDto>> surveyDtoList = new ArrayList<>();
        for (Survey survey : surveyList) {
            surveyDtoList.add(Optional.ofNullable(surveyMapper.toSurveyInfoDto(survey)));
        }
        return surveyDtoList;
    }

    // Need to test
    public Optional<Survey> getSurveyByIdWithRelatedQuestion(UUID surveyId) {
        return Optional.ofNullable(surveyRepository.findBySurveyIdWithRelatedQuestionBank(surveyId))
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));
    }

    @Transactional
    public SurveyInfoDto createSurvey(Authentication authentication,
        SurveyRequestDto surveyRequestDto) {
        Survey survey = surveyRepository.save(surveyMapper.toSurvey(surveyRequestDto));
        questionService.createQuestion(surveyRequestDto, survey);
        participationService.createParticipation(authentication, surveyRequestDto, survey);
        return surveyMapper.toSurveyInfoDto(survey);
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

    public SurveyInfoDto updateSurvey(SurveyUpdateRequestDto surveyUpdateRequestDto) {
        Survey survey = surveyRepository.findBySurveyId(surveyUpdateRequestDto.getSurveyId())
            .orElseThrow(
                () -> new ExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND,
                    surveyUpdateRequestDto.getSurveyId()));

        /* If client tries to modify the survey already started,
            Can't update survey.
         */
        if (LocalDateTime.now(ZoneId.of("Asia/Seoul")).isBefore(survey.getStartedDate())) {
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
        return surveyMapper.toSurveyInfoDto(survey);
    }
}
