package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import org.springframework.stereotype.Component;

@Component
public class QuestionBankMapper {

    public QuestionBank toQuestionBank(QuestionRequestDto questionRequestDto) {
        return QuestionBank.builder()
            .title(questionRequestDto.getTitle())
            .type(questionRequestDto.getQuestionType())
            .description(questionRequestDto.getDescription())
            .build();
    }

}
