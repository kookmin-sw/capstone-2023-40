package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.AnsweredQuestionDto;
import com.thesurvey.api.util.StringUtil;

import org.springframework.stereotype.Component;

@Component
public class AnsweredQuestionMapper {

    public AnsweredQuestion toAnsweredQuestion(
        AnsweredQuestionDto answeredQuestionRequestDto, User user, Survey survey,
        QuestionBank questionBank) {

        return AnsweredQuestion
            .builder()
            .user(user)
            .survey(survey)
            .questionBank(questionBank)
            .singleChoice(answeredQuestionRequestDto.getSingleChoice())
            .shortAnswer(StringUtil.trim(answeredQuestionRequestDto.getShortAnswer()))
            .longAnswer(StringUtil.trim(answeredQuestionRequestDto.getLongAnswer()))
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

}
