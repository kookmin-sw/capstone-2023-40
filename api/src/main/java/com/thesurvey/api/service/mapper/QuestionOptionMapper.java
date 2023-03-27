package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.QuestionOptionDto;
import org.springframework.stereotype.Component;

@Component
public class QuestionOptionMapper {

    public QuestionOption toQuestionOption(QuestionOptionDto questionOptionDto,
        QuestionBank questionBank) {
        return QuestionOption.builder()
            .questionBank(questionBank)
            .description(questionOptionDto.getDescription())
            .option(questionOptionDto.getOption())
            .build();
    }
}
