package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import java.util.List;
import javax.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankUpdateRequestDto {
    @NotBlank
    private Long questionBankId;

    @NotBlank
    private String title;

    private String description;

    private QuestionType questionType;

    @NotBlank
    private Boolean isRequired;

    @NotBlank
    private Integer questionNo;

    private List<QuestionOptionUpdateRequestDto> questionOptions;
}
