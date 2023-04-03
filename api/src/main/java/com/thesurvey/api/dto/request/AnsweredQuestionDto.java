package com.thesurvey.api.dto.request;

import java.util.List;
import javax.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionDto {

    @NotBlank
    private String questionTitle;

    @NotBlank
    private String questionDescription;

    private String singleChoice;

    private List<String> multipleChoices;

    private String shortAnswer;

    private String longAnswer;

}
