package com.thesurvey.api.dto;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankInfoDto {

    private String title;

    private String description;

    private QuestionType questionType;

    private List<QuestionOptionInfoDto> questionOptions;

}