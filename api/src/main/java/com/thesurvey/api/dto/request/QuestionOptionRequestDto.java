package com.thesurvey.api.dto.request;

import javax.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionOptionRequestDto {

        @NotBlank
        private String option;

        private String description;

}
