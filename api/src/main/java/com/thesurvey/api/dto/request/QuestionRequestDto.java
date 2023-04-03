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
public class QuestionRequestDto {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @Valid
    @NotNull
    private QuestionType questionType;

    @NotNull
    private Integer questionNo;

    @NotNull
    private boolean isRequired;

    @Valid
    private List<QuestionOptionRequestDto> questionOptions;
}
