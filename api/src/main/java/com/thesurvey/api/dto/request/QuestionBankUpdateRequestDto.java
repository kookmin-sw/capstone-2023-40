package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankUpdateRequestDto {

    private Long questionBankId;

    private String title;

    private String description;

    private QuestionType questionType;

    private Boolean isRequired;

    private Integer questionNo;

    private List<QuestionOptionUpdateRequestDto> questionOptions;
}
