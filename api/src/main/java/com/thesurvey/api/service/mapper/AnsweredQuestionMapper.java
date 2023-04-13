package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.response.AnsweredQuestionInfoDto;
import com.thesurvey.api.dto.response.AnsweredQuestionResponseDto;
import com.thesurvey.api.dto.request.AnsweredQuestionDto;
import com.thesurvey.api.exception.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ErrorMessage;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class AnsweredQuestionMapper {

    public AnsweredQuestionInfoDto toAnsweredInfoQuestionDtoWithMultipleChoices(
        AnsweredQuestion answeredQuestion,
        QuestionBank questionBank, List<Integer> multipleChoices) {

        return AnsweredQuestionInfoDto.builder()
            .answeredQuestionId(answeredQuestion.getAnsweredQuestionId().getAnswerId())
            .questionTitle(questionBank.getTitle())
            .questionDescription(questionBank.getDescription())
            .multipleChoices(multipleChoices)
            .build();
    }

    public AnsweredQuestionInfoDto toAnsweredInfoQuestionDto(AnsweredQuestion answeredQuestion,
        QuestionBank questionBank, List<Integer> multipleChoices) {

        return AnsweredQuestionInfoDto.builder()
            .answeredQuestionId(answeredQuestion.getAnsweredQuestionId().getAnswerId())
            .questionTitle(questionBank.getTitle())
            .questionDescription(questionBank.getDescription())
            .singleChoice(answeredQuestion.getSingleChoice())
            .multipleChoices(multipleChoices)
            .shortAnswer(answeredQuestion.getShortAnswer())
            .longAnswer(answeredQuestion.getLongAnswer())
            .build();
    }

    public AnsweredQuestion toAnsweredQuestion(
        AnsweredQuestionDto answeredQuestionRequestDto, User user, Survey survey,
        QuestionBank questionBank) {
        String shortAnswer = answeredQuestionRequestDto.getShortAnswer();
        String longAnswer = answeredQuestionRequestDto.getLongAnswer();
        if (shortAnswer != null) {
            if (shortAnswer.isBlank()) {
                throw new BadRequestExceptionMapper(ErrorMessage.NO_ONLY_WHITESPACE);
            }
            shortAnswer = shortAnswer.trim();
        } else if (longAnswer != null) {
            if (longAnswer.isBlank()) {
                throw new BadRequestExceptionMapper(ErrorMessage.NO_ONLY_WHITESPACE);
            }
            longAnswer = longAnswer.trim();
        }

        return AnsweredQuestion
            .builder()
            .user(user)
            .survey(survey)
            .questionBank(questionBank)
            .singleChoice(answeredQuestionRequestDto.getSingleChoice())
            .shortAnswer(shortAnswer)
            .longAnswer(longAnswer)
            .build();
    }

    public AnsweredQuestion toAnsweredQuestionWithMultipleChoices(User user, Survey survey,
        QuestionBank questionBank, int multipleChoice) {
        return AnsweredQuestion
            .builder()
            .user(user)
            .survey(survey)
            .questionBank(questionBank)
            .multipleChoice(multipleChoice)
            .build();
    }

    public AnsweredQuestionResponseDto toAnsweredQuestionResponseDto(Survey survey,
        List<AnsweredQuestionInfoDto> answeredQuestionInfoDtoList) {
        return AnsweredQuestionResponseDto.builder()
            .surveyId(survey.getSurveyId())
            .questions(answeredQuestionInfoDtoList)
            .build();
    }

}
