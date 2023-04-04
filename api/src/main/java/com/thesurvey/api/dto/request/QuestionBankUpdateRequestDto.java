package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankUpdateRequestDto {

    @NotNull
    private Long questionBankId;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private QuestionType questionType;

    @NotNull
    private Boolean isRequired;

    @NotNull
    private Integer questionNo;

    @Valid
    private List<QuestionOptionUpdateRequestDto> questionOptions;
}
