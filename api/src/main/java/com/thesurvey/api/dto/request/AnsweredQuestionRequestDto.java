package com.thesurvey.api.dto.request;

import java.util.List;
import java.util.UUID;
import javax.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionRequestDto {
    @NotBlank
    private UUID surveyId;

    @NotBlank
    List<AnsweredQuestionDto> questionList;

}
