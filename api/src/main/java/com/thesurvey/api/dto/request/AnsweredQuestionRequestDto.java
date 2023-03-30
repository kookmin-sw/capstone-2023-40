package com.thesurvey.api.dto.request;

import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionRequestDto {

    private UUID surveyId;

    List<AnsweredQuestionDto> questionList;

}
