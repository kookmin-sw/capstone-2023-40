package com.thesurvey.api.service;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.thesurvey.api.domain.AnsweredQuestion;
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
import com.thesurvey.api.service.mapper.SurveyMapper;
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

    public SurveyService(SurveyRepository surveyRepository, SurveyMapper surveyMapper,
        QuestionService questionService,
        QuestionOptionService questionOptionService, ParticipationService participationService,
        AnsweredQuestionService answeredQuestionService) {
        this.surveyRepository = surveyRepository;
        this.surveyMapper = surveyMapper;
        this.questionService = questionService;
        this.questionOptionService = questionOptionService;
        this.participationService = participationService;
        this.answeredQuestionService = answeredQuestionService;
    }

    @Transactional(readOnly = true)
    public SurveyListPageDto getAllSurvey(int page) {
        if (page < 1) {
            throw new BadRequestExceptionMapper(ErrorMessage.INVALID_REQUEST);
        }
        Page<Survey> surveyPage = surveyRepository.findAllInDescendingOrder(
            PageRequest.of(page - 1, 8));
        if (surveyPage.getTotalPages() < page) {
            throw new NotFoundExceptionMapper(ErrorMessage.PAGE_NOT_FOUND);
        }
        List<SurveyPageDto> surveyPageDtoList = surveyPage.getContent().stream()
            .map(surveyMapper::toSurveyPageDto).collect(Collectors.toList());
        return surveyMapper.toSurveyListPageDto(surveyPageDtoList, surveyPage);
    }

    @Transactional(readOnly = true)
    public SurveyResponseDto getSurveyBySurveyIdWithRelatedQuestion(UUID surveyId) {
        Survey survey = surveyRepository.findBySurveyId(surveyId)
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));
        return surveyMapper.toSurveyResponseDto(survey, survey.getAuthorId());
    }

    @Transactional(readOnly = true)
    public List<UserSurveyTitleDto> getUserCreatedSurveys(Authentication authentication) {
        return surveyRepository.findUserCreatedSurveysByAuthorID(
                UserUtil.getUserIdFromAuthentication(authentication))
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.USER_CREATED_SURVEY_NOT_FOUND));
    }

    /**
     * Returns a {@link UserSurveyResultDto} that represents the answers to the survey.
     *
     * @param authentication authentication of the requesting user
     * @param surveyId the ID of survey to get result
     * @return UserSurveyResultDto
     */
    @Transactional(readOnly = true)
    public UserSurveyResultDto getUserCreatedSurveyResult(Authentication authentication,
        UUID surveyId) {
        Survey survey = surveyRepository.findBySurveyId(surveyId)
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));

        // validate survey author from current user
        validateSurveyAuthor(UserUtil.getUserIdFromAuthentication(authentication),
            survey.getAuthorId());

        // validate if the survey has not yet started
        if (survey.getStartedDate().isAfter(LocalDateTime.now(ZoneId.of("Asia/Seoul")))) {
            throw new BadRequestExceptionMapper(ErrorMessage.SURVEY_NOT_STARTED);
        }

        // fetch all QuestionBanks by "surveyId"
        List<QuestionBank> questionBanks = questionService.getAllQuestionBankBySurveyId(surveyId);

        // fetch all QuestionBankAnswerDtos by "questionbanks"
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
        Survey survey = surveyRepository.save(
            surveyMapper.toSurvey(surveyRequestDto, user.getUserId()));
        questionService.createQuestion(surveyRequestDto, survey);
        participationService.createParticipation(user, surveyRequestDto.getCertificationTypes(),
            survey);
        return surveyMapper.toSurveyResponseDto(survey, user.getUserId());
    }

    @Transactional
    public void deleteSurvey(Authentication authentication, UUID surveyId) {
        Long userId = UserUtil.getUserIdFromAuthentication(authentication);
        Survey survey = surveyRepository.findBySurveyId(surveyId).orElseThrow(
            () -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));

        // validate survey author from current user
        validateSurveyAuthor(userId, survey.getAuthorId());

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
        Long userId = UserUtil.getUserIdFromAuthentication(authentication);
        Survey survey = surveyRepository.findBySurveyId(surveyUpdateRequestDto.getSurveyId())
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));

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
        surveyRepository.save(survey);
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

    /**
     * Returns a list of {@link QuestionBankAnswerDto} based on the provided list of {@link QuestionBank}.
     * For each QuestionBank, this method fetches the question number and answered questions, and then builds a
     * {@link QuestionBankAnswerDto}.
     *
     * @param questionBankList a list of QuestionBanks fetched by {@code surveyId}
     * @return List<QuestionBankAnswerDto>
     */
    private List<QuestionBankAnswerDto> getQuestionBankAnswerDtoList(List<QuestionBank> questionBankList) {

        /*
         * In this loop, fetch the QuestionNo and AnsweredQuestion
         * for each QuestionBank.
         * then build a QuestionBankAnswerDto and add to 'questionBankAnswerDtoList'.
         */
        List<QuestionBankAnswerDto> questionBankAnswerDtoList = new ArrayList<>();
        for (QuestionBank questionBank : questionBankList) {

            // get QuestionNo by "questionBankId"
            Integer questionNo = questionService.getQuestionNoByQuestionBankId(
                questionBank.getQuestionBankId());

            // fetch all AnsweredQuestions by "questionBankId"
            List<AnsweredQuestion> answeredQuestionList = answeredQuestionService.getAnswerQuestionByQuestionBankId(
                questionBank.getQuestionBankId());

            // get current QuestionBank's QuestionType
            QuestionType questionType = questionBank.getQuestionType();

            List<QuestionOptionAnswerDto> questionOptionAnswerDtoList = new ArrayList<>();
            List<String> shortLongAnswerList = new ArrayList<>();

            // In case it's choice answer
            if (questionType == QuestionType.SINGLE_CHOICE
                || questionType == QuestionType.MULTIPLE_CHOICES) {
                questionOptionAnswerDtoList = getQuestionOptionAnswerDtoList(
                    questionBank.getQuestionBankId(), questionBank.getQuestionType());
            }
            // In case it's short or long answer
            else if (questionType == QuestionType.SHORT_ANSWER
                || questionType == QuestionType.LONG_ANSWER) {
                shortLongAnswerList =
                    getShortLongAnswerList(questionBank.getQuestionType(), answeredQuestionList);
            }

            questionBankAnswerDtoList.add(
                // build QuestionBankAnswerDto
                QuestionBankAnswerDto.builder()
                    .questionBankId(questionBank.getQuestionBankId())
                    .questionTitle(questionBank.getTitle())
                    .questionDescription(questionBank.getDescription())
                    .questionType(questionBank.getQuestionType())
                    .questionNo(questionNo)
                    .textAnswers(shortLongAnswerList)
                    .optionAnswers(questionOptionAnswerDtoList)
                    .build()
            );
        } // end loop

        return questionBankAnswerDtoList;
    }

    /**
     * Returns a list of {@link QuestionOptionAnswerDto} containing the answer data
     * for a given {@code Long questionBankId} and {@code QuestionType questionType}.
     *
     * @param questionBankId the ID of the question bank for which to retrieve answer data
     * @param questionType  the type of question for which to retrieve answer data,
     * either {@code QuestionType.SINGLE_CHOICE} or {@code QuestionType.MULTIPLE_CHOICES}
     * @return List<QuestionOptionAnswerDto>
     */
    private List<QuestionOptionAnswerDto> getQuestionOptionAnswerDtoList(Long questionBankId,
        QuestionType questionType) {

        /*
         * "List<Long[]> answeredChoiceList" is a list containing arrays of
         * [questionOptionId, totalResponseCount].
         */
        List<Long[]> answeredChoiceList = new ArrayList<>();
        if (questionType == QuestionType.SINGLE_CHOICE) {
            answeredChoiceList = answeredQuestionService.getSingleChoiceResult(
                questionBankId);
        } else if (questionType == QuestionType.MULTIPLE_CHOICES) {
            answeredChoiceList = answeredQuestionService.getMultipleChoiceResult(
                questionBankId);
        }

        List<QuestionOptionAnswerDto> questionOptionAnswerDtoList = new ArrayList<>();
        for (Long[] answeredChoiceResult : answeredChoiceList) {
            Long questionOptionId = answeredChoiceResult[0];
            Long totalResponseCount = answeredChoiceResult[1];
            questionOptionAnswerDtoList.add(
                // build QuestionOptionAnswerDto
                QuestionOptionAnswerDto.builder()
                    .questionOptionId(questionOptionId)
                    .option(questionOptionService.getOptionByQuestionOptionId(questionOptionId))
                    .totalResponseCount(totalResponseCount)
                    .build()
            );
        }

        return questionOptionAnswerDtoList;
    }

    /**
     * Returns a list of short or long answer strings
     * based on the provided {@code QuestionType questionType} and
     * {@code List<AnsweredQuestion>answeredQuestionList}.
     *
     * @param questionType the type of question for which to retrieve answer data,
     * either {@code QuestionType.SHORT_ANSWER} or {@code QuestionType.LONG_ANSWER}
     * @param answeredQuestionList a list of {@code AnsweredQuestion}
     * @return List<String>
     */
    private List<String> getShortLongAnswerList(QuestionType questionType,
        List<AnsweredQuestion> answeredQuestionList) {

        List<String> shortLongAnswerList = new ArrayList<>();
        if (questionType == QuestionType.SHORT_ANSWER) {
            shortLongAnswerList = answeredQuestionList.stream()
                .map(AnsweredQuestion::getShortAnswer)
                .collect(Collectors.toList());
        } else if (questionType == QuestionType.LONG_ANSWER) {
            shortLongAnswerList = answeredQuestionList.stream()
                .map(AnsweredQuestion::getLongAnswer)
                .collect(Collectors.toList());
        }

        return shortLongAnswerList;
    }

}
