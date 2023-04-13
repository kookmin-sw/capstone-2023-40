package com.thesurvey.api.service;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.response.AnsweredQuestionInfoDto;
import com.thesurvey.api.dto.response.AnsweredQuestionResponseDto;
import com.thesurvey.api.dto.request.AnsweredQuestionDto;
import com.thesurvey.api.dto.request.AnsweredQuestionRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ForbiddenRequestExceptionMapper;
import com.thesurvey.api.exception.NotFoundExceptionMapper;
import com.thesurvey.api.repository.AnsweredQuestionRepository;
import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.QuestionRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.AnsweredQuestionMapper;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AnsweredQuestionService {

    private final UserRepository userRepository;
    private final SurveyRepository surveyRepository;
    private final AnsweredQuestionRepository answeredQuestionRepository;
    private final QuestionBankRepository questionBankRepository;
    private final AnsweredQuestionMapper answeredQuestionMapper;
    private final ParticipationRepository participationRepository;
    private final QuestionRepository questionRepository;

    public AnsweredQuestionService(UserRepository userRepository, SurveyRepository surveyRepository,
        AnsweredQuestionRepository answeredQuestionRepository,
        QuestionBankRepository questionBankRepository,
        AnsweredQuestionMapper answeredQuestionMapper,
        ParticipationRepository participationRepository, QuestionRepository questionRepository) {
        this.userRepository = userRepository;
        this.surveyRepository = surveyRepository;
        this.answeredQuestionRepository = answeredQuestionRepository;
        this.questionBankRepository = questionBankRepository;
        this.answeredQuestionMapper = answeredQuestionMapper;
        this.participationRepository = participationRepository;
        this.questionRepository = questionRepository;
    }

    @Transactional
    public AnsweredQuestionResponseDto createAnswer(Authentication authentication,
        AnsweredQuestionRequestDto answeredQuestionRequestDto) {

        User user = userRepository.findByName(authentication.getName())
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));

        Survey survey = surveyRepository.findBySurveyId(answeredQuestionRequestDto.getSurveyId())
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));

        // validate if a user has already responded to the survey
        if (answeredQuestionRepository.existsByUserIdAndSurveyId(user.getUserId(), answeredQuestionRequestDto.getSurveyId())) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.ANSWER_ALREADY_SUBMITTED);
        }

        // validate if the survey creator is attempting to respond to their own survey
        if (participationRepository.existsByUserIdAndSurveyId(user.getUserId(),
            survey.getSurveyId())) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.CREATOR_CANNOT_ANSWER);
        }

        // validate if the survey has not yet started
        if (LocalDateTime.now(ZoneId.of("Asia/Seoul")).isBefore(survey.getStartedDate())) {
            throw new ForbiddenRequestExceptionMapper(ErrorMessage.SURVEY_NOT_STARTED);
        }

        List<AnsweredQuestionInfoDto> savedAnsweredQuestionInfoDtoList = new ArrayList<>();
        for (AnsweredQuestionDto answeredQuestionDto : answeredQuestionRequestDto.getAnswers()) {
            validateEmptyAnswer(answeredQuestionDto);

            QuestionBank questionBank = questionBankRepository.findByQuestionBankId(
                    answeredQuestionDto.getQuestionBankId())
                .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.QUESTION_BANK_NOT_FOUND));

            // check if the question is included in the survey.
            if (questionRepository.notExistsBySurveyIdAndQuestionBankId(survey.getSurveyId(),
                questionBank.getQuestionBankId())) {
                throw new BadRequestExceptionMapper(ErrorMessage.NOT_SURVEY_QUESTION);
            }

            if (answeredQuestionDto.getMultipleChoices() != null
                && answeredQuestionDto.getMultipleChoices().size() != 0) {
                List<AnsweredQuestion> answeredQuestionList = answeredQuestionDto.getMultipleChoices()
                    .stream()
                    .map(choice -> answeredQuestionMapper.toAnsweredQuestionWithMultipleChoices(
                        user, survey, questionBank, choice))
                    .collect(Collectors.toList());

                List<AnsweredQuestion> savedAnsweredQuestionList = answeredQuestionRepository.saveAll(
                    answeredQuestionList);

                //  make a List of multipleChoice for assigning values to AnsweredInfoQuestionDto.multipleChoices
                List<Integer> multipleChoice = savedAnsweredQuestionList.stream().map(
                    AnsweredQuestion::getMultipleChoice).collect(Collectors.toList());

                savedAnsweredQuestionInfoDtoList.add(
                    answeredQuestionMapper.toAnsweredInfoQuestionDtoWithMultipleChoices(
                        savedAnsweredQuestionList.get(0),
                        questionBank, multipleChoice));
            } else {
                AnsweredQuestion savedAnsweredQuestion = answeredQuestionRepository.save(
                    answeredQuestionMapper.toAnsweredQuestion(answeredQuestionDto, user,
                        survey, questionBank));

                savedAnsweredQuestionInfoDtoList.add(
                    answeredQuestionMapper.toAnsweredInfoQuestionDto(savedAnsweredQuestion,
                        questionBank, null));
            }
        }

        return answeredQuestionMapper.toAnsweredQuestionResponseDto(survey,
            savedAnsweredQuestionInfoDtoList);

    }

    @Transactional
    public void deleteAnswer(UUID surveyId) {
        List<AnsweredQuestion> answeredQuestionList = answeredQuestionRepository.findAllBySurveyId(
            surveyId);
        answeredQuestionRepository.deleteAll(answeredQuestionList);
    }

    public void validateEmptyAnswer(AnsweredQuestionDto answeredQuestionDto) {
        if (answeredQuestionDto.getLongAnswer() == null
            && answeredQuestionDto.getShortAnswer() == null
            && answeredQuestionDto.getSingleChoice() == null
            && (answeredQuestionDto.getMultipleChoices() == null
            || answeredQuestionDto.getMultipleChoices().isEmpty())
        ) {
            throw new BadRequestExceptionMapper(ErrorMessage.NO_ANSWER_TO_QUESTION);
        }
    }

}
