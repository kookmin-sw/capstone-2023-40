package com.thesurvey.api.dto;

import com.thesurvey.api.domain.AnsweredQuestion;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class AnsweredQuestionDto {
    private String shortAnswer;

    private String longAnswer;

    private String singleChoice;

    private String multipleChoices;

}
