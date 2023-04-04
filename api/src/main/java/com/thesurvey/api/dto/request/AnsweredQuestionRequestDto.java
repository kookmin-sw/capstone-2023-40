package com.thesurvey.api.dto.request;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionRequestDto {

    @NotNull
    private UUID surveyId;

    @Valid
    @NotNull
    List<AnsweredQuestionDto> questionList;

}
