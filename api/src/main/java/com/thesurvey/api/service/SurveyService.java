package com.thesurvey.api.service;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.response.SurveyResponseDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ForbiddenRequestExceptionMapper;
import com.thesurvey.api.exception.NotFoundExceptionMapper;
import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
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
    private final AnsweredQuestionService answeredQuestionService;
    private final UserRepository userRepository;
    private final ParticipationRepository participationRepository;

    public SurveyService(SurveyRepository surveyRepository, SurveyMapper surveyMapper,
        QuestionService questionService,
        ParticipationService participationService,
        AnsweredQuestionService answeredQuestionService, UserRepository userRepository,
        ParticipationRepository participationRepository) {
        this.surveyRepository = surveyRepository;
        this.surveyMapper = surveyMapper;
        this.questionService = questionService;
        this.participationService = participationService;
        this.answeredQuestionService = answeredQuestionService;
        this.userRepository = userRepository;
        this.participationRepository = participationRepository;
    }

    @Transactional(readOnly = true)
    public List<SurveyResponseDto> getAllSurvey() {
        return Optional.ofNullable(
                surveyRepository.findAllInDescendingOrder())
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND))
            .stream()
            .map(surveyMapper::toSurveyResponseDto)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SurveyResponseDto getSurveyBySurveyIdWithRelatedQuestion(UUID surveyId) {
        Survey survey = surveyRepository.findBySurveyId(surveyId)
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));
        return surveyMapper.toSurveyResponseDto(survey);
    }

    @Transactional
    public SurveyResponseDto createSurvey(Authentication authentication,
        SurveyRequestDto surveyRequestDto) {
        /*
         * A 5-second delay is allowed
         * if a user sets the start time for a survey to the current time.
         */
        if (surveyRequestDto.getStartedDate().isBefore(
            LocalDateTime.now(ZoneId.of("Asia/Seoul")).minusSeconds(5))) {
            throw new BadRequestExceptionMapper(ErrorMessage.STARTEDDATE_ISBEFORE_CURRENTDATE);
        }

        // validate for when the start time of the survey is set after the end time.
        if (surveyRequestDto.getStartedDate().isAfter(
            surveyRequestDto.getEndedDate())) {
            throw new BadRequestExceptionMapper(ErrorMessage.STARTEDDATE_ISAFTER_ENDEDDATE);
        }

        Survey survey = surveyRepository.save(surveyMapper.toSurvey(surveyRequestDto));
        questionService.createQuestion(surveyRequestDto, survey);
        participationService.createParticipation(authentication,
            surveyRequestDto.getCertificationType(), survey);
        return surveyMapper.toSurveyResponseDto(survey);
    }

    @Transactional
    public void deleteSurvey(Authentication authentication, UUID surveyId) {
        Survey survey = surveyRepository.findById(surveyId)
            .orElseThrow(
                () -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND, surveyId));

        User user = userRepository.findByName(authentication.getName())
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));

        // validate for when a non-survey author attempts to delete.
        if (!participationRepository.existsByUserIdAndSurveyId(user.getUserId(),
            survey.getSurveyId())) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.NO_HAVE_AUTHORITY);
        }

        // validate for attempts to delete a started survey.
        if (survey.getStartedDate().isBefore(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            && LocalDateTime.now(ZoneId.of("Asia/Seoul")).isBefore(survey.getEndedDate())) {
            throw new BadRequestExceptionMapper(ErrorMessage.SURVEY_ALREADY_STARTED);
        }

        answeredQuestionService.deleteAnswer(surveyId);
        surveyRepository.delete(survey);
        participationService.deleteParticipation(surveyId);
        questionService.deleteQuestion(surveyId);
    }

    @Transactional
    public SurveyResponseDto updateSurvey(Authentication authentication,
        SurveyUpdateRequestDto surveyUpdateRequestDto) {
        Survey survey = surveyRepository.findById(surveyUpdateRequestDto.getSurveyId())
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND,
                surveyUpdateRequestDto.getSurveyId()));

        User user = userRepository.findByName(authentication.getName())
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));

        if (!participationRepository.existsByUserIdAndSurveyId(user.getUserId(),
            survey.getSurveyId())) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.NO_HAVE_AUTHORITY);
        }

        validateUpdateSurvey(survey, surveyUpdateRequestDto);

        if (surveyUpdateRequestDto.getTitle() != null) {
            survey.changeTitle(surveyUpdateRequestDto.getTitle().trim());
        }

        if (surveyUpdateRequestDto.getDescription() != null) {
            survey.changeDescription(surveyUpdateRequestDto.getDescription().trim());
        }

        if (surveyUpdateRequestDto.getStartedDate() != null) {
            survey.changeStartedDate(surveyUpdateRequestDto.getStartedDate());
        }

        if (surveyUpdateRequestDto.getEndedDate() != null) {
            survey.changeEndedDate(surveyUpdateRequestDto.getEndedDate());
        }

        questionService.updateQuestion(surveyUpdateRequestDto.getQuestions());
        return surveyMapper.toSurveyResponseDto(survey);
    }

    public void validateUpdateSurvey(Survey survey, SurveyUpdateRequestDto surveyUpdateRequestDto) {
        // validate for attempts to modify ended survey.
        if (survey.getEndedDate().isBefore(LocalDateTime.now(ZoneId.of("Asia/Seoul")))) {
            throw new BadRequestExceptionMapper(ErrorMessage.SURVEY_ALREADY_ENDED);
        }

        // validate for when to modify a survey that has already been started.
        if (survey.getStartedDate()
            .isBefore(LocalDateTime.now(ZoneId.of("Asia/Seoul")).minusSeconds(5))
            && LocalDateTime.now(ZoneId.of("Asia/Seoul")).isBefore(survey.getEndedDate())) {
            throw new BadRequestExceptionMapper(ErrorMessage.SURVEY_ALREADY_STARTED);
        }

        // validate for when the start time of the survey is set after the end time.
        if (surveyUpdateRequestDto.getEndedDate()
            .isBefore(surveyUpdateRequestDto.getStartedDate())) {
            throw new BadRequestExceptionMapper(ErrorMessage.STARTEDDATE_ISAFTER_ENDEDDATE);
        }

    }

}
