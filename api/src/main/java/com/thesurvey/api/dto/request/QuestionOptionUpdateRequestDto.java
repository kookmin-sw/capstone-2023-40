package com.thesurvey.api.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionOptionUpdateRequestDto {

    private Long questionOptionId;

    private Long questionBankId;

    private String option;

    private String description;

}
