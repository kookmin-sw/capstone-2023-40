package com.thesurvey.api.dto.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionOptionUpdateRequestDto {

    @NotNull
    @Positive
    @Schema(example = "1", description = "선택 항목 아이디는 양수여야 합니다.")
    private Long optionId;

    @Size(max = 50)
    @Schema(example = "아니오", description = "선택 항목 제목은 100자 이내여야 합니다.")
    private String option;

    @Size(max = 255)
    @Schema(example = "비사용자", description = "선택 항목 상세내용은 255자 이내여야 합니다.")
    private String description;

}
