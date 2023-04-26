package com.thesurvey.api.dto.request;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionRequestDto {

    @NotBlank
    @Size(max = 100)
    @Schema(example = "카카오톡 서비스 사용자이신가요?", description = "질문 제목은 100자 이내여야 합니다.")
    private String title;

    @NotBlank
    @Size(max = 255)
    @Schema(example = "카카오톡 사용자여부 확인", description = "질문 상세내용은 255자 이내여야 합니다.")
    private String description;

    @Valid
    @NotNull
    @Schema(example = "SINGLE_CHOICE", description = "질문 유형에는 다음의 값들이 올 수 있습니다: \"SINGLE_CHOICE\" \"MULTIPLE_CHOICE\" \"SHORT_ANSWER\" \"LONG_ANSWER\"")
    private QuestionType questionType;

    @NotNull
    @Positive
    @Schema(example = "1", description = "각 질문의 순서를 결정하는 번호로, 양수여야 합니다.")
    private Integer questionNo;

    @NotNull
    @Schema(example = "true", description = "필수 질문여부를 나타냅니다.")
    private Boolean isRequired;

    @Valid
    private List<QuestionOptionRequestDto> questionOptions;
}
