package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.response.QuestionOptionResponseDto;
import org.springframework.stereotype.Component;

@Component
public class QuestionOptionMapper {

    public QuestionOption toQuestionOption(QuestionOptionResponseDto questionOptionResponseDto,
        QuestionBank questionBank) {
        return QuestionOption.builder()
            .questionBank(questionBank)
            .description(questionOptionResponseDto.getDescription())
            .option(questionOptionResponseDto.getOption())
            .build();
    }

    public QuestionOptionResponseDto toQuestionOptionInfoDto(QuestionOption questionOption) {
        return QuestionOptionResponseDto.builder()
            .questionOptionId(questionOption.getQuestionOptionId())
            .option(questionOption.getOption())
            .description(questionOption.getDescription())
            .build();
    }
}
