package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.QuestionOptionDto;
import org.springframework.stereotype.Component;

// @formatter:off
@Component
public class QuestionOptionMapper {
    public QuestionOption toQuestionOption(QuestionOptionDto questionOptionDto) {
        return QuestionOption
            .builder()
            .description(questionOptionDto.getDescription())
            .option(questionOptionDto.getOption())
            .build();
    }
}
// @formatter:on
