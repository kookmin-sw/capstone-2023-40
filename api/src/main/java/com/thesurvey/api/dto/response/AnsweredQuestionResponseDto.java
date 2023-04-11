package com.thesurvey.api.dto.response;

import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionResponseDto {

    private UUID surveyId;

    List<AnsweredQuestionInfoDto> questions;

}
