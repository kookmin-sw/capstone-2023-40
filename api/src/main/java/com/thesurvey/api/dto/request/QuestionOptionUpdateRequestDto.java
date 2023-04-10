package com.thesurvey.api.dto.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionOptionUpdateRequestDto {

    @NotNull
    @Positive
    private Long optionId;

    @Size(max = 50)
    private String option;

    @Size(max = 255)
    private String description;

}
