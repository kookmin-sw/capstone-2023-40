package com.thesurvey.api.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionOptionRequestDto {

        @NotBlank
        @Size(max = 100)
        private String option;

        @Size(max = 255)
        private String description;

}
