package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.request.QuestionOptionRequestDto;
import com.thesurvey.api.dto.response.QuestionOptionResponseDto;
import org.springframework.stereotype.Component;

@Component
public class QuestionOptionMapper {

    public QuestionOption toQuestionOption(QuestionOptionRequestDto questionOptionRequestDto,
        QuestionBank questionBank) {
        String description = questionOptionRequestDto.getDescription();
        if (questionOptionRequestDto.getDescription() != null
            && questionOptionRequestDto.getDescription().length() != 0) {
            description = questionOptionRequestDto.getDescription().trim();
        }
        return QuestionOption.builder()
            .questionBank(questionBank)
            .option(questionOptionRequestDto.getOption().trim())
            .description(description)
            .build();
    }

    public QuestionOptionResponseDto toQuestionOptionResponseDto(QuestionOption questionOption) {
        return QuestionOptionResponseDto.builder()
            .questionOptionId(questionOption.getQuestionOptionId())
            .option(questionOption.getOption())
            .description(questionOption.getDescription())
            .build();
    }
}
