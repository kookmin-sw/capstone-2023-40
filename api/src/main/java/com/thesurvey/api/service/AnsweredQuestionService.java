package com.thesurvey.api.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.answeredQuestion.AnsweredQuestionDto;
import com.thesurvey.api.dto.request.answeredQuestion.AnsweredQuestionRequestDto;
import com.thesurvey.api.dto.response.answeredQuestion.AnsweredQuestionRewardPointDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.mapper.BadRequestExceptionMapper;
import com.thesurvey.api.exception.mapper.ForbiddenRequestExceptionMapper;
import com.thesurvey.api.exception.mapper.NotFoundExceptionMapper;
import com.thesurvey.api.exception.mapper.UnauthorizedRequestExceptionMapper;
import com.thesurvey.api.repository.AnsweredQuestionRepository;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.QuestionRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserCertificationRepository;
import com.thesurvey.api.service.converter.CertificationTypeConverter;
import com.thesurvey.api.service.mapper.AnsweredQuestionMapper;
import com.thesurvey.api.util.PointUtil;
import com.thesurvey.api.util.StringUtil;
import com.thesurvey.api.util.UserUtil;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AnsweredQuestionService {

    private final SurveyRepository surveyRepository;

    private final AnsweredQuestionRepository answeredQuestionRepository;

    private final QuestionBankRepository questionBankRepository;

    private final AnsweredQuestionMapper answeredQuestionMapper;

    private final QuestionRepository questionRepository;

    private final ParticipationService participationService;

    private final UserCertificationRepository userCertificationRepository;

    private final CertificationTypeConverter certificationTypeConverter;

    private final PointHistoryService pointHistoryService;

    private final PointUtil pointUtil;

    public AnsweredQuestionService(SurveyRepository surveyRepository,
        AnsweredQuestionRepository answeredQuestionRepository,
        QuestionBankRepository questionBankRepository,
        AnsweredQuestionMapper answeredQuestionMapper,
        QuestionRepository questionRepository,
        ParticipationService participationService, UserCertificationRepository userCertificationRepository, CertificationTypeConverter certificationTypeConverter, PointHistoryService pointHistoryService, PointUtil pointUtil) {
        this.surveyRepository = surveyRepository;
        this.answeredQuestionRepository = answeredQuestionRepository;
        this.questionBankRepository = questionBankRepository;
        this.answeredQuestionMapper = answeredQuestionMapper;
        this.questionRepository = questionRepository;
        this.participationService = participationService;
        this.userCertificationRepository = userCertificationRepository;
        this.certificationTypeConverter = certificationTypeConverter;
        this.pointHistoryService = pointHistoryService;
        this.pointUtil = pointUtil;
    }

    @Transactional
    public List<AnsweredQuestion> getAnswerQuestionByQuestionBankId(Long questionBankId) {
        return answeredQuestionRepository.findAllByQuestionBankId(questionBankId);
    }

    @Transactional(readOnly = true)
    public List<Long[]> getSingleChoiceResult(Long questionBankId) {
        return answeredQuestionRepository.countSingleChoiceByQuestionBankId(questionBankId);
    }

    @Transactional(readOnly = true)
    public List<Long[]> getMultipleChoiceResult(Long questionBankId) {
        return answeredQuestionRepository.countMultipleChoiceByQuestionBankId(questionBankId);
    }

    @Transactional
    public AnsweredQuestionRewardPointDto createAnswer(Authentication authentication,
        AnsweredQuestionRequestDto answeredQuestionRequestDto) {
        User user = UserUtil.getUserFromAuthentication(authentication);
        Survey survey = surveyRepository.findBySurveyId(answeredQuestionRequestDto.getSurveyId())
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));

        // validate if a user has already responded to the survey
        if (answeredQuestionRepository.existsByUserIdAndSurveyId(user.getUserId(),
            answeredQuestionRequestDto.getSurveyId())) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.ANSWER_ALREADY_SUBMITTED);
        }
        List<Integer> surveyCertificationList = surveyRepository.findCertificationTypeBySurveyIdAndAuthorId(
            survey.getSurveyId(), survey.getAuthorId());
        validateUserCompletedCertification(surveyCertificationList, user.getUserId());
        validateCreateAnswerRequest(user, survey);

        int rewardPoints = 0;
        boolean isAnswered = false;
        for (AnsweredQuestionDto answeredQuestionDto : answeredQuestionRequestDto.getAnswers()) {
            if (answeredQuestionDto.getIsRequired() && validateEmptyAnswer(answeredQuestionDto)) {
                throw new BadRequestExceptionMapper(ErrorMessage.NOT_ANSWER_TO_REQUIRED_QUESTION);
            }
            if (!isAnswered && !validateEmptyAnswer(answeredQuestionDto)) {
                isAnswered = true;
            }

            QuestionBank questionBank = questionBankRepository.findByQuestionBankId(
                answeredQuestionDto.getQuestionBankId()).orElseThrow(
                () -> new NotFoundExceptionMapper(ErrorMessage.QUESTION_BANK_NOT_FOUND));

            // check if the question is included in the survey.
            if (questionRepository.notExistsBySurveyIdAndQuestionBankId(survey.getSurveyId(),
                questionBank.getQuestionBankId())) {
                throw new BadRequestExceptionMapper(ErrorMessage.NOT_SURVEY_QUESTION);
            }

            // In case it's not multiple choice question
            if (answeredQuestionDto.getMultipleChoices() == null
                || answeredQuestionDto.getMultipleChoices().isEmpty()) {
                answeredQuestionRepository.save(
                    answeredQuestionMapper.toAnsweredQuestion(answeredQuestionDto, user, survey,
                        questionBank));
            } else {
                // In case it's multiple choice question
                List<AnsweredQuestion> answeredQuestionList = answeredQuestionDto.getMultipleChoices()
                    .stream()
                    .map(choice -> answeredQuestionMapper.toAnsweredQuestionWithMultipleChoices(
                        user, survey, questionBank, choice))
                    .collect(Collectors.toList());

                answeredQuestionRepository.saveAll(answeredQuestionList);
            }
            rewardPoints += getQuestionBankRewardPoints(answeredQuestionDto);

        }
        if (!isAnswered) {
            throw new BadRequestExceptionMapper(ErrorMessage.ANSWER_AT_LEAST_ONE_QUESTION);
        }

        List<CertificationType> certificationTypeList =
            getCertificationTypeList(surveyCertificationList);
        participationService.createParticipation(user, certificationTypeList, survey);
        pointHistoryService.savePointHistory(user, rewardPoints);

        return AnsweredQuestionRewardPointDto.builder().rewardPoints(rewardPoints).build();
    }

    @Transactional
    public void deleteAnswer(UUID surveyId) {
        List<AnsweredQuestion> answeredQuestionList = answeredQuestionRepository.findAllBySurveyId(
            surveyId);
        answeredQuestionRepository.deleteAll(answeredQuestionList);
    }

    private void validateCreateAnswerRequest(User user, Survey survey) {
        // validate if a user has already responded to the survey
        if (answeredQuestionRepository.existsByUserIdAndSurveyId(user.getUserId(),
            survey.getSurveyId())) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.ANSWER_ALREADY_SUBMITTED);
        }

        // validate if the survey creator is attempting to respond to their own survey
        if (user.getUserId().equals(survey.getAuthorId())) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.CREATOR_CANNOT_ANSWER);
        }

        // validate if the survey has not yet started
        if (LocalDateTime.now(ZoneId.of("Asia/Seoul")).isBefore(survey.getStartedDate())) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.SURVEY_NOT_STARTED);
        }

        // validate if the survey has already ended
        if (LocalDateTime.now(ZoneId.of("Asia/Seoul")).isAfter(survey.getEndedDate())) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.SURVEY_ALREADY_ENDED);
        }
    }

    private boolean validateEmptyAnswer(AnsweredQuestionDto answeredQuestionDto) {
        return (answeredQuestionDto.getLongAnswer() == null
            || StringUtil.trimShortLongAnswer(answeredQuestionDto.getLongAnswer(),
            answeredQuestionDto.getIsRequired()).isEmpty())
            && (answeredQuestionDto.getShortAnswer() == null
            || StringUtil.trimShortLongAnswer(answeredQuestionDto.getShortAnswer(),
            answeredQuestionDto.getIsRequired()).isEmpty())
            && answeredQuestionDto.getSingleChoice() == null
            && (answeredQuestionDto.getMultipleChoices() == null || answeredQuestionDto.getMultipleChoices().isEmpty());
    }

    // validate if the user has completed the necessary certifications for the survey
    private void validateUserCompletedCertification(List<Integer> surveyCertificationList, Long userId) {
        if (surveyCertificationList.contains(CertificationType.NONE.getCertificationTypeId())) {
            return;
        }
        List<Integer> userCertificationList = userCertificationRepository.findUserCertificationTypeByUserId(
            userId);
        if (!new HashSet<>(userCertificationList).containsAll(surveyCertificationList)) {
            throw new UnauthorizedRequestExceptionMapper(ErrorMessage.CERTIFICATION_NOT_COMPLETED);
        }
    }

    private List<CertificationType> getCertificationTypeList(List<Integer> surveyCertificationList) {
        if (surveyCertificationList.contains(CertificationType.NONE.getCertificationTypeId())) {
            return List.of(CertificationType.NONE);
        }
        return certificationTypeConverter.toCertificationTypeList(surveyCertificationList);
    }

    private int getQuestionBankRewardPoints(AnsweredQuestionDto answeredQuestionDto) {
        if (!validateEmptyAnswer(answeredQuestionDto)) {
            return pointUtil.calculateSurveyMaxRewardPoints(answeredQuestionDto.getQuestionType());
        }
        return 0;
    }

}
