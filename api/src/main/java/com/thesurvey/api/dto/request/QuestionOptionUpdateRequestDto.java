package com.thesurvey.api.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionOptionUpdateRequestDto {

    private Long optionId;

    private String option;

    private String description;

}
