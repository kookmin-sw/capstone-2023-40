package com.thesurvey.api.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class QuestionOptionDto {

    private String option;

    private String description;
}
