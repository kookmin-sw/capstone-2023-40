package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.QuestionOptionInfoDto;
import org.springframework.stereotype.Component;

@Component
public class QuestionOptionMapper {

    public QuestionOption toQuestionOption(QuestionOptionInfoDto questionOptionInfoDto,
        QuestionBank questionBank) {
        return QuestionOption.builder()
            .questionBank(questionBank)
            .description(questionOptionInfoDto.getDescription())
            .option(questionOptionInfoDto.getOption())
            .build();
    }

    public QuestionOptionInfoDto toQuestionOptionInfoDto(QuestionOption questionOption) {
        return QuestionOptionInfoDto.builder()
            .option(questionOption.getOption())
            .description(questionOption.getDescription())
            .build();
    }
}
