package com.thesurvey.api.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class QuestionOptionResponseDto {

    @Schema(example = "1", description = "생성된 질문에 속하는 선택 항목의 아이디입니다.")
    private Long questionOptionId;

    @Schema(example = "예", description = "생성된 질문에 속하는 선택 항목의 내용입니다.")
    private String option;

    @Schema(example = "사용자", description = "생성된 질문에 속하는 선택 항목의 상세 내용입니다.")
    private String description;

}
