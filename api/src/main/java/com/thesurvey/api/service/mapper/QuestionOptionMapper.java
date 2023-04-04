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
        return QuestionOption.builder()
            .questionBank(questionBank)
            .option(questionOptionRequestDto.getOption())
            .description(questionOptionRequestDto.getDescription())
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
