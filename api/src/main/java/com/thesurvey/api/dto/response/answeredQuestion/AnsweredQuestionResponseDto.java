package com.thesurvey.api.dto.response.answeredQuestion;

import java.util.List;
import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionResponseDto {

    List<AnsweredQuestionInfoDto> questions;

    @Schema(example = "93c0a231-207e-4190-aee9-0a5f78cafc44", description = "참여한 설문조사의 아이디입니다.")
    private UUID surveyId;

}
