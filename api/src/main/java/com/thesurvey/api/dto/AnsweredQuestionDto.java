package com.thesurvey.api.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionDto {

    private String shortAnswer;

    private String longAnswer;

    private String singleChoice;

    private String multipleChoices;

}
