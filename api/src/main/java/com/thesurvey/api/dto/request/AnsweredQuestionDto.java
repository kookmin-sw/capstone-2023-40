package com.thesurvey.api.dto.request;

import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionDto {

    @NotBlank
    @Size(max = 100)
    private String questionTitle;

    @NotBlank
    @Size(max = 255)
    private String questionDescription;

    private String singleChoice;

    private List<String> multipleChoices;

    @Size(max = 100)
    private String shortAnswer;

    @Size(max = 255)
    private String longAnswer;

}
