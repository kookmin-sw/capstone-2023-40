package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.response.QuestionOptionResponseDto;
import java.util.List;
import javax.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionRequestDto {

    private String title;

    private String description;

    private QuestionType questionType;
    @NotBlank
    private int questionNo;

    @NotBlank
    private boolean isRequired;

    private List<QuestionOptionResponseDto> questionOptions;
}
