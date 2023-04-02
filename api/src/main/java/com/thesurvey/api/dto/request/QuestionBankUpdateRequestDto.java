package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankUpdateRequestDto {
    @NotNull
    private Long questionBankId;

    @NotBlank(message = "제목은 필수 정보입니다.")
    private String title;

    @NotBlank(message = "설명은 필수 정보입니다.")
    private String description;

    private QuestionType questionType;

    @NotBlank
    private Boolean isRequired;

    @NotNull(message = "질문 번호는 필수 정보입니다.")
    private Integer questionNo;

    private List<QuestionOptionUpdateRequestDto> questionOptions;
}
