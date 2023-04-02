package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.response.QuestionOptionResponseDto;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionRequestDto {
    @NotBlank(message = "제목은 필수 정보입니다.")
    private String title;

    @NotBlank(message = "설명은 필수 정보입니다.")
    private String description;

    private QuestionType questionType;

    @NotNull(message = "질문 번호는 필수 정보입니다.")
    private int questionNo;

    @NotNull
    private boolean isRequired;

    private List<QuestionOptionResponseDto> questionOptions;
}
