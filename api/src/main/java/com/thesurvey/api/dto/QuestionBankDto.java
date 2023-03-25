package com.thesurvey.api.dto;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankDto {

    private String title;

    private String description;

    private String question;

    private QuestionType questionType;

    private List<QuestionOptionDto> questionOptionDtos;

}