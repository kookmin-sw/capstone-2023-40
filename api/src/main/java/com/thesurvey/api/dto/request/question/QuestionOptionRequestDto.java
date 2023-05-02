package com.thesurvey.api.dto.request.question;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionOptionRequestDto {

    @NotBlank
    @Size(max = 100)
    @Schema(example = "예", description = "선택 항목 제목은 100자 이내여야 합니다.")
    private String option;

    @Size(max = 255)
    @Schema(example = "사용자", description = "선택 항목 상세내용은 255자 이내여야 합니다.")
    private String description;

}
