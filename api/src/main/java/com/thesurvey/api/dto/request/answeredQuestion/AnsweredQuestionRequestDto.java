package com.thesurvey.api.dto.request.answeredQuestion;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

// FIXME: this should be fixed since answers should only have one of 4 question types
@Getter
@Builder
public class AnsweredQuestionRequestDto {

    @NotEmpty
    List<@Valid AnsweredQuestionDto> answers;

    @NotNull
    @Schema(example = "93c0a231-207e-4190-aee9-0a5f78cafc44", description = "수정하려는 설문조사의 아이디입니다.")
    private UUID surveyId;

}
