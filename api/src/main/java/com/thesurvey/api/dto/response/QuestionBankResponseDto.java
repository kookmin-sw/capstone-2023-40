package com.thesurvey.api.dto.response;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankResponseDto {

    private Long questionBankId;

    private String title;

    private String description;

    private QuestionType questionType;

    private List<QuestionOptionResponseDto> questionOptions;

}
