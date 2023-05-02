package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.request.question.QuestionOptionRequestDto;
import com.thesurvey.api.dto.response.question.QuestionOptionResponseDto;
import com.thesurvey.api.util.StringUtil;

import org.springframework.stereotype.Component;

@Component
public class QuestionOptionMapper {

    public QuestionOption toQuestionOption(QuestionOptionRequestDto questionOptionRequestDto,
        QuestionBank questionBank) {
        return QuestionOption.builder()
            .questionBank(questionBank)
            .option(StringUtil.trim(questionOptionRequestDto.getOption()))
            .description(StringUtil.trim(questionOptionRequestDto.getDescription()))
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
