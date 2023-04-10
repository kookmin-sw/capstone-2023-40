package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankUpdateRequestDto {

    @NotNull
    @Positive
    private Long questionBankId;

    @Size(max = 100)
    private String title;

    @Size(max = 255)
    private String description;

    @Valid
    private QuestionType questionType;

    private Boolean isRequired;

    @Positive
    private Integer questionNo;

    @Valid
    private List<QuestionOptionUpdateRequestDto> questionOptions;
}
