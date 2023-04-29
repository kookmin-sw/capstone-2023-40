package com.thesurvey.api.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionOptionAnswerDto {

    @Schema(example = "1", description = "조회된 질문에 속하는 선택 항목의 아이디입니다.")
    private Long questionOptionId;

    @Schema(example = "예", description = "조회된 질문에 속하는 선택 항목의 내용입니다.")
    private String option;

    @Schema(example = "3", description = "조회된 질문에 속하는 선택 항목의 총 응답 수 입니다.")
    private Long responseNumber;

}
