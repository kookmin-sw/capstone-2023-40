package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.AnsweredInfoQuestionDto;
import com.thesurvey.api.dto.AnsweredQuestionDto;
import com.thesurvey.api.dto.request.AnsweredQuestionRequestDto;
import org.springframework.stereotype.Component;

@Component
public class AnsweredQuestionMapper {

    public AnsweredInfoQuestionDto toAnsweredInfoQuestionDto(Survey survey,
        AnsweredQuestionRequestDto answeredQuestionRequestDto) {

        return AnsweredInfoQuestionDto.builder()
            .surveyTitle(survey.getTitle())
            .questions(answeredQuestionRequestDto.getQuestionList())
            .build();
    }

    public AnsweredQuestion toAnsweredQuestion(
        AnsweredQuestionDto answeredQuestionRequestDto, User user, Survey survey,
        QuestionBank questionBank, String choice) {
        return AnsweredQuestion
            .builder()
            .user(user)
            .survey(survey)
            .questionBank(questionBank)
            .shortAnswer(answeredQuestionRequestDto.getShortAnswer())
            .longAnswer(answeredQuestionRequestDto.getLongAnswer())
            .singleChoice(answeredQuestionRequestDto.getSingleChoice())
            .multipleChoices(choice)
            .build();
    }

}
