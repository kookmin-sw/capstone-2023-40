package com.thesurvey.api.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionOptionUpdateRequestDto {

    @NotNull
    private Long optionId;

    @NotBlank
    private String option;

    private String description;

}
