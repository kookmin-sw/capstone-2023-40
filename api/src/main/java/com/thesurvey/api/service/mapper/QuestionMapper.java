package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {

    public Question toQuestion(QuestionRequestDto questionRequestDto, Survey survey,
        QuestionBank questionBank) {
        return Question
            .builder()
            .isRequired(questionRequestDto.isRequired())
            .questionNo(questionRequestDto.getQuestionNo())
            .survey(survey)
            .questionBank(questionBank)
            .build();
    }
}
