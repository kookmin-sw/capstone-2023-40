package com.thesurvey.api.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class QuestionOptionInfoDto {

    private String option;

    private String description;

}
