package com.thesurvey.api.dto.response;

import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionInfoDto {

    private UUID answeredQuestionId;

    private String questionTitle;

    private String questionDescription;

    private String singleChoice;

    private List<String> multipleChoices;

    private String shortAnswer;

    private String longAnswer;

}
