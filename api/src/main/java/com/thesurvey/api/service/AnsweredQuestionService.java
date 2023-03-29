package com.thesurvey.api.service;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.AnsweredInfoQuestionDto;
import com.thesurvey.api.dto.AnsweredQuestionDto;
import com.thesurvey.api.dto.request.AnsweredQuestionRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.AnsweredQuestionRepository;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.AnsweredQuestionMapper;
import java.util.List;
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
    public AnsweredInfoQuestionDto createAnswer(Authentication authentication,
        AnsweredQuestionRequestDto answeredQuestionRequestDto) {

        User user = userRepository.findByName(authentication.getName())
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));

        Survey survey = surveyRepository.findBySurveyId(answeredQuestionRequestDto.getSurveyId())
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));

        for (AnsweredQuestionDto answeredQuestionDto : answeredQuestionRequestDto.getQuestionList()) {

            QuestionBank questionBank = questionBankRepository.findBySurveyIdAndTitle(
                    survey.getSurveyId(), answeredQuestionDto.getQuestionTitle())
                .orElseThrow(() -> new ExceptionMapper(ErrorMessage.QUESTION_BANK_NOT_FOUND));

            if (answeredQuestionDto.getMultipleChoices() != null) {
                List<AnsweredQuestion> answeredQuestionList = answeredQuestionDto.getMultipleChoices()
                    .stream()
                    .map(choice -> answeredQuestionMapper.toAnsweredQuestion(
                        answeredQuestionDto, user, survey, questionBank, choice))
                    .collect(Collectors.toList());
                answeredQuestionRepository.saveAll(answeredQuestionList);
            } else {
                answeredQuestionRepository.save(
                    answeredQuestionMapper.toAnsweredQuestion(answeredQuestionDto, user,
                        survey,
                        questionBank, null));
            }
        }

        return answeredQuestionMapper.toAnsweredInfoQuestionDto(survey, answeredQuestionRequestDto);
    }

}
