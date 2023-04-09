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
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.AnsweredQuestionRepository;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.AnsweredQuestionMapper;
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

    public AnsweredQuestionService(UserRepository userRepository, SurveyRepository surveyRepository,
        AnsweredQuestionRepository answeredQuestionRepository,
        QuestionBankRepository questionBankRepository,
        AnsweredQuestionMapper answeredQuestionMapper) {
        this.userRepository = userRepository;
        this.surveyRepository = surveyRepository;
        this.answeredQuestionRepository = answeredQuestionRepository;
        this.questionBankRepository = questionBankRepository;
        this.answeredQuestionMapper = answeredQuestionMapper;
    }

    @Transactional
    public AnsweredQuestionResponseDto createAnswer(Authentication authentication,
        AnsweredQuestionRequestDto answeredQuestionRequestDto) {

        User user = userRepository.findByName(authentication.getName())
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));

        if (answeredQuestionRepository.existsByUserId(user.getUserId())) {
            throw new ExceptionMapper(ErrorMessage.ANSWER_ALREADY_SUBMITTED);
        }

        Survey survey = surveyRepository.findBySurveyId(answeredQuestionRequestDto.getSurveyId())
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));

        List<AnsweredQuestionInfoDto> savedAnsweredQuestionInfoDtoList = new ArrayList<>();
        for (AnsweredQuestionDto answeredQuestionDto : answeredQuestionRequestDto.getQuestionList()) {
            validateNoAnswerToQuestion(answeredQuestionDto);

            QuestionBank questionBank = questionBankRepository.findBySurveyIdAndTitle(
                    survey.getSurveyId(), answeredQuestionDto.getQuestionTitle())
                .orElseThrow(() -> new ExceptionMapper(ErrorMessage.QUESTION_BANK_NOT_FOUND));

            if (answeredQuestionDto.getMultipleChoices() != null
                && answeredQuestionDto.getMultipleChoices().size() != 0) {
                List<AnsweredQuestion> answeredQuestionList = answeredQuestionDto.getMultipleChoices()
                    .stream()
                    .map(choice -> answeredQuestionMapper.toAnsweredQuestionWithMultipleChoices(
                        user, survey, questionBank, choice))
                    .collect(Collectors.toList());

                List<AnsweredQuestion> savedAnsweredQuestionList = answeredQuestionRepository.saveAll(
                    answeredQuestionList);

                List<String> multipleChoice = savedAnsweredQuestionList.stream().map(
                    AnsweredQuestion::getMultipleChoices).collect(Collectors.toList());

                savedAnsweredQuestionInfoDtoList.add(
                    answeredQuestionMapper.toAnsweredInfoQuestionDtoWithMultipleChoices(
                        savedAnsweredQuestionList.get(0),
                        questionBank, multipleChoice));
            } else {
                AnsweredQuestion savedAnsweredQuestion = answeredQuestionRepository.save(
                    answeredQuestionMapper.toAnsweredQuestion(answeredQuestionDto, user,
                        survey, questionBank, null));

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

    public void validateNoAnswerToQuestion(AnsweredQuestionDto answeredQuestionDto) {
        if (answeredQuestionDto.getLongAnswer() == null
            && answeredQuestionDto.getShortAnswer() == null
            && answeredQuestionDto.getMultipleChoices() == null
            && answeredQuestionDto.getSingleChoice() == null) {
            throw new ExceptionMapper(ErrorMessage.NO_ANSWER_TO_QUESTION);
        }
    }

}
