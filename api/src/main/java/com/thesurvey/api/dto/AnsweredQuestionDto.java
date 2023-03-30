package com.thesurvey.api.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionDto {

    private String questionTitle;

    private String questionDescription;

    private String singleChoice;

    private List<String> multipleChoices;

    private String shortAnswer;

    private String longAnswer;

}
