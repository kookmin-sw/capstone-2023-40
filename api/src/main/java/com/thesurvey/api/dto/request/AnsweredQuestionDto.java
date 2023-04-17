package com.thesurvey.api.dto.request;

import java.util.List;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionDto {

    private Long questionBankId;

    @Positive
    private Integer singleChoice;

    @Size(min = 1)
    private List<Integer> multipleChoices;

    @Size(max = 100)
    private String shortAnswer;

    @Size(max = 255)
    private String longAnswer;

}
