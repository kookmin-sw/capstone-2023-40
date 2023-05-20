package com.thesurvey.api.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.survey.SurveyRequestDto;
import com.thesurvey.api.dto.request.survey.SurveyUpdateRequestDto;
import com.thesurvey.api.dto.response.question.QuestionBankAnswerDto;
import com.thesurvey.api.dto.response.question.QuestionOptionAnswerDto;
import com.thesurvey.api.dto.response.survey.SurveyListPageDto;
import com.thesurvey.api.dto.response.survey.SurveyPageDto;
import com.thesurvey.api.dto.response.survey.SurveyResponseDto;
import com.thesurvey.api.dto.response.user.UserSurveyResultDto;
import com.thesurvey.api.dto.response.user.UserSurveyTitleDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.mapper.BadRequestExceptionMapper;
import com.thesurvey.api.exception.mapper.ForbiddenRequestExceptionMapper;
import com.thesurvey.api.exception.mapper.NotFoundExceptionMapper;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.mapper.QuestionBankMapper;
import com.thesurvey.api.service.mapper.QuestionOptionMapper;
import com.thesurvey.api.service.mapper.SurveyMapper;
import com.thesurvey.api.util.PointUtil;
import com.thesurvey.api.util.StringUtil;
import com.thesurvey.api.util.UserUtil;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;

    private final SurveyMapper surveyMapper;

    private final QuestionService questionService;

    private final QuestionOptionService questionOptionService;

    private final ParticipationService participationService;

    private final AnsweredQuestionService answeredQuestionService;

    private final QuestionOptionMapper questionOptionMapper;

    private final QuestionBankMapper questionBankMapper;

    private final PointHistoryService pointHistoryService;

    private final PointUtil pointUtil;

    public SurveyService(SurveyRepository surveyRepository, SurveyMapper surveyMapper,
        QuestionService questionService,
        QuestionOptionService questionOptionService, ParticipationService participationService,
        AnsweredQuestionService answeredQuestionService, QuestionOptionMapper questionOptionMapper, QuestionBankMapper questionBankMapper, PointHistoryService pointHistoryService, PointUtil pointUtil) {
        this.surveyRepository = surveyRepository;
        this.surveyMapper = surveyMapper;
        this.questionService = questionService;
        this.questionOptionService = questionOptionService;
        this.participationService = participationService;
        this.answeredQuestionService = answeredQuestionService;
        this.questionOptionMapper = questionOptionMapper;
        this.questionBankMapper = questionBankMapper;
        this.pointHistoryService = pointHistoryService;
        this.pointUtil = pointUtil;
    }

    @Transactional(readOnly = true)
    public SurveyListPageDto getAllSurvey(int page) {
        // page starts from 1
        if (page < 1) {
            throw new BadRequestExceptionMapper(ErrorMessage.INVALID_REQUEST);
        }

        Page<Survey> surveyPage = surveyRepository.findAllInDescendingOrder(
            PageRequest.of(page - 1, 8));
        if (surveyPage.getTotalElements() != 0 && surveyPage.getTotalPages() < page) {
            throw new NotFoundExceptionMapper(ErrorMessage.PAGE_NOT_FOUND);
        }

        List<SurveyPageDto> surveyPageDtoList = surveyPage.getContent().stream()
            .map(surveyMapper::toSurveyPageDto).collect(Collectors.toList());
        return surveyMapper.toSurveyListPageDto(surveyPageDtoList, surveyPage);
    }

    @Transactional(readOnly = true)
    public SurveyResponseDto getSurveyBySurveyIdWithRelatedQuestion(UUID surveyId) {
        Survey survey = getSurveyFromSurveyId(surveyId);
        return surveyMapper.toSurveyResponseDto(survey, survey.getAuthorId());
    }

    @Transactional(readOnly = true)
    public List<UserSurveyTitleDto> getUserCreatedSurveys(Authentication authentication) {
        return surveyRepository.findUserCreatedSurveysByAuthorID(
            UserUtil.getUserIdFromAuthentication(authentication));
    }

    /**
     * Returns survey results and the answers created by the user.
     *
     * @param authentication authentication of the requesting user
     * @param surveyId the ID of survey to get result
     * @return {@link UserSurveyResultDto}
     */
    @Transactional(readOnly = true)
    public UserSurveyResultDto getUserCreatedSurveyResult(Authentication authentication,
        UUID surveyId) {
        Survey survey = getSurveyFromSurveyId(surveyId);

        // validate survey author from current user
        validateSurveyAuthor(UserUtil.getUserIdFromAuthentication(authentication),
            survey.getAuthorId());

        // validate if the survey has not yet started
        if (survey.getStartedDate().isAfter(LocalDateTime.now(ZoneId.of("Asia/Seoul")))) {
            throw new BadRequestExceptionMapper(ErrorMessage.SURVEY_NOT_STARTED);
        }

        List<QuestionBank> questionBanks = questionService.getAllQuestionBankBySurveyId(surveyId);

        List<QuestionBankAnswerDto> questionBankAnswerDtoList = getQuestionBankAnswerDtoList(questionBanks);

        return surveyMapper.toUserSurveyResultDto(survey, questionBankAnswerDtoList);
    }

    @Transactional
    public SurveyResponseDto createSurvey(Authentication authentication,
        SurveyRequestDto surveyRequestDto) {

        // `startedDate` is only allowed to be within 5 seconds from now or later.
        if (surveyRequestDto.getStartedDate()
            .isBefore(LocalDateTime.now(ZoneId.of("Asia/Seoul")).minusSeconds(5))) {
            throw new BadRequestExceptionMapper(ErrorMessage.STARTEDDATE_ISBEFORE_CURRENTDATE);
        }

        // validate for when the start time of the survey is set after the end time.
        if (surveyRequestDto.getStartedDate().isAfter(surveyRequestDto.getEndedDate())) {
            throw new BadRequestExceptionMapper(ErrorMessage.STARTEDDATE_ISAFTER_ENDEDDATE);
        }
        User user = UserUtil.getUserFromAuthentication(authentication);

        List<CertificationType> certificationTypes =
            surveyRequestDto.getCertificationTypes().isEmpty()
                ? List.of(CertificationType.NONE) : surveyRequestDto.getCertificationTypes();

        Survey survey = surveyRepository.save(surveyMapper.toSurvey(surveyRequestDto,
            user.getUserId()));
        questionService.createQuestion(surveyRequestDto.getQuestions(), survey);

        int surveyCreatePoints = pointUtil.calculateSurveyCreatePoints(survey.getSurveyId());
        pointUtil.validateUserPoint(surveyCreatePoints, user.getUserId());

        participationService.createParticipation(user, certificationTypes, survey);
        pointHistoryService.savePointHistory(user, -surveyCreatePoints);
        return surveyMapper.toSurveyResponseDto(survey, user.getUserId());
    }

    @Transactional
    public void deleteSurvey(Authentication authentication, UUID surveyId) {
        User user = UserUtil.getUserFromAuthentication(authentication);
        Survey survey = getSurveyFromSurveyId(surveyId);

        // validate survey author from current user
        validateSurveyAuthor(user.getUserId(), survey.getAuthorId());

        // validate for attempts to delete a started survey.
        if (survey.getStartedDate().isBefore(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            && LocalDateTime.now(ZoneId.of("Asia/Seoul")).isBefore(survey.getEndedDate())) {
            throw new BadRequestExceptionMapper(ErrorMessage.SURVEY_ALREADY_STARTED);
        }

        answeredQuestionService.deleteAnswer(surveyId);
        surveyRepository.delete(survey);
        participationService.deleteParticipation(surveyId);
        questionService.deleteQuestion(surveyId);

        int surveyCreatePoints = pointUtil.calculateSurveyCreatePoints(survey.getSurveyId());
        pointHistoryService.savePointHistory(user, surveyCreatePoints);
    }

    @Transactional
    public SurveyResponseDto updateSurvey(Authentication authentication,
        SurveyUpdateRequestDto surveyUpdateRequestDto) {
        Long userId = UserUtil.getUserIdFromAuthentication(authentication);
        Survey survey = getSurveyFromSurveyId(surveyUpdateRequestDto.getSurveyId());

        // validate survey author from current user
        validateSurveyAuthor(userId, survey.getAuthorId());

        // validate survey request dto
        validateUpdateSurvey(survey, surveyUpdateRequestDto);

        survey.changeTitle(StringUtil.trim(surveyUpdateRequestDto.getTitle()));
        survey.changeDescription(StringUtil.trim(surveyUpdateRequestDto.getDescription()));

        if (surveyUpdateRequestDto.getStartedDate() != null) {
            survey.changeStartedDate(surveyUpdateRequestDto.getStartedDate());
        }

        if (surveyUpdateRequestDto.getEndedDate() != null) {
            survey.changeEndedDate(surveyUpdateRequestDto.getEndedDate());
        }

        questionService.updateQuestion(survey.getSurveyId(), surveyUpdateRequestDto.getQuestions());
        return surveyMapper.toSurveyResponseDto(survey, userId);
    }

    public void validateUpdateSurvey(Survey survey, SurveyUpdateRequestDto surveyUpdateRequestDto) {
        // validate for attempts to modify ended survey.
        if (survey.getEndedDate().isBefore(LocalDateTime.now(ZoneId.of("Asia/Seoul")))) {
            throw new BadRequestExceptionMapper(ErrorMessage.SURVEY_ALREADY_ENDED);
        }

        // validate for when to modify a survey that has already been started.
        if (survey.getStartedDate()
            .isBefore(LocalDateTime.now(ZoneId.of("Asia/Seoul")).minusSeconds(5))) {
            throw new BadRequestExceptionMapper(ErrorMessage.SURVEY_ALREADY_STARTED);
        }

        // validate for when the start time of the survey is set after the end time.
        if (surveyUpdateRequestDto.getEndedDate()
            .isBefore(surveyUpdateRequestDto.getStartedDate())) {
            throw new BadRequestExceptionMapper(ErrorMessage.STARTEDDATE_ISAFTER_ENDEDDATE);
        }

        // `startedDate` is only allowed to be within 5 seconds from now or later.
        if (surveyUpdateRequestDto.getStartedDate()
            .isBefore(LocalDateTime.now(ZoneId.of("Asia/Seoul")).minusSeconds(5))) {
            throw new BadRequestExceptionMapper(ErrorMessage.STARTEDDATE_ISBEFORE_CURRENTDATE);
        }

    }

    private void validateSurveyAuthor(Long userId, Long authorId) {
        if (!userId.equals(authorId)) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.AUTHOR_NOT_MATCHING);
        }
    }

    private Survey getSurveyFromSurveyId(UUID surveyId) {
        return surveyRepository.findBySurveyId(surveyId)
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));
    }

    private List<QuestionBankAnswerDto> getQuestionBankAnswerDtoList(List<QuestionBank> questionBankList) {
        List<QuestionBankAnswerDto> questionBankAnswerDtoList = new ArrayList<>();
        for (QuestionBank questionBank : questionBankList) {
            QuestionType questionType = questionBank.getQuestionType();
            Long questionBankId = questionBank.getQuestionBankId();
            Integer questionNo = questionService.getQuestionNoByQuestionBankId(
                questionBank.getQuestionBankId());
            List<AnsweredQuestion> answeredQuestionList = answeredQuestionService.getAnswerQuestionByQuestionBankId(
                questionBank.getQuestionBankId());

            List<QuestionOptionAnswerDto> questionOptionAnswerDtoList = new ArrayList<>();
            List<String> shortLongAnswerList = new ArrayList<>();

            if (questionType == QuestionType.SINGLE_CHOICE || questionType == QuestionType.MULTIPLE_CHOICES) {
                questionOptionAnswerDtoList = getQuestionOptionAnswerDtoList(questionBankId,
                    questionType);
            } else if (questionType == QuestionType.SHORT_ANSWER || questionType == QuestionType.LONG_ANSWER) {
                shortLongAnswerList = getShortLongAnswerList(questionType, answeredQuestionList);
            }

            questionBankAnswerDtoList.add(questionBankMapper.toQuestionBankAnswerDto(questionBank,
                questionNo, shortLongAnswerList, questionOptionAnswerDtoList));
        }

        return questionBankAnswerDtoList;
    }

    /**
     * Returns a list of {@link QuestionOptionAnswerDto} containing the answer data
     * for a given {@code Long questionBankId} and {@code QuestionType questionType}.
     *
     * @param questionBankId the ID of the question bank for which to retrieve answer data
     * @param questionType  the type of question for which to retrieve answer data,
     * either {@code QuestionType.SINGLE_CHOICE} or {@code QuestionType.MULTIPLE_CHOICES}
     * @return {@code List<QuestionOptionAnswerDto>}
     */
    private List<QuestionOptionAnswerDto> getQuestionOptionAnswerDtoList(Long questionBankId,
        QuestionType questionType) {
        List<Long[]> answeredChoiceList = new ArrayList<>();
        if (questionType == QuestionType.SINGLE_CHOICE) {
            answeredChoiceList = answeredQuestionService.getSingleChoiceResult(
                questionBankId);
        } else if (questionType == QuestionType.MULTIPLE_CHOICES) {
            answeredChoiceList = answeredQuestionService.getMultipleChoiceResult(
                questionBankId);
        }

        return answeredChoiceList.stream()
            .map(answeredChoiceResult -> {
                Long questionOptionId = answeredChoiceResult[0];
                Long totalResponseCount = answeredChoiceResult[1];
                String option = questionOptionService.getOptionByQuestionOptionId(questionOptionId);
                return questionOptionMapper.toQuestionOptionAnswerDto(questionOptionId, option, totalResponseCount);
            })
            .collect(Collectors.toList());

    }

    /**
     * Returns a list of short or long answer strings
     * based on the provided {@code QuestionType questionType} and
     * {@code List<AnsweredQuestion>answeredQuestionList}.
     *
     * @param questionType the type of question for which to retrieve answer data,
     * either {@code QuestionType.SHORT_ANSWER} or {@code QuestionType.LONG_ANSWER}
     * @param answeredQuestionList a list of {@code AnsweredQuestion}
     * @return {@code List<String>}
     */
    private List<String> getShortLongAnswerList(QuestionType questionType,
        List<AnsweredQuestion> answeredQuestionList) {

        List<String> shortLongAnswerList = new ArrayList<>();
        if (questionType == QuestionType.SHORT_ANSWER) {
            shortLongAnswerList = getShortAnswerList(answeredQuestionList);
        } else if (questionType == QuestionType.LONG_ANSWER) {
            shortLongAnswerList = getLongAnswerList(answeredQuestionList);
        }

        return shortLongAnswerList;
    }

    private List<String> getShortAnswerList(List<AnsweredQuestion> answeredQuestionList) {
        return answeredQuestionList.stream()
            .map(AnsweredQuestion::getShortAnswer)
            .collect(Collectors.toList());
    }

    private List<String> getLongAnswerList(List<AnsweredQuestion> answeredQuestionList) {
        return answeredQuestionList.stream()
            .map(AnsweredQuestion::getLongAnswer)
            .collect(Collectors.toList());
    }

}
