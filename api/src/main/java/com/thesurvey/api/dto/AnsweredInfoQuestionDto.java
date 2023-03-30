package com.thesurvey.api.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredInfoQuestionDto {

    private String surveyTitle;

    List<AnsweredQuestionDto> questions;

}
