package com.thesurvey.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class QuestionOptionResponseDto {

    private Long questionOptionId;

    private String option;

    private String description;

}
