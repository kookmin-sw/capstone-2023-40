package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.response.AnsweredQuestionInfoDto;
import com.thesurvey.api.dto.response.AnsweredQuestionResponseDto;
import com.thesurvey.api.dto.request.AnsweredQuestionDto;
import com.thesurvey.api.dto.request.AnsweredQuestionRequestDto;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class AnsweredQuestionMapper {

    public AnsweredQuestionInfoDto toAnsweredInfoQuestionDto(AnsweredQuestion answeredQuestion,
        QuestionBank questionBank, List<String> multipleChoices) {

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
        QuestionBank questionBank, String multipleChoice) {

        return AnsweredQuestion
            .builder()
            .user(user)
            .survey(survey)
            .questionBank(questionBank)
            .singleChoice(answeredQuestionRequestDto.getSingleChoice())
            .multipleChoices(multipleChoice)
            .shortAnswer(answeredQuestionRequestDto.getShortAnswer())
            .longAnswer(answeredQuestionRequestDto.getLongAnswer())
            .build();
    }

    public AnsweredQuestionResponseDto toAnsweredQuestionResponseDto(Survey survey,
        List<AnsweredQuestionInfoDto> answeredQuestionInfoDtoList) {
        return AnsweredQuestionResponseDto.builder()
            .surveyId(survey.getSurveyId())
            .surveyTitle(survey.getTitle())
            .questions(answeredQuestionInfoDtoList)
            .build();
    }

}
