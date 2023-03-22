package com.thesurvey.api.dto;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyCreateDto {

    private UUID surveyId;

    private String title;

    private String description;
    private Timestamp createdDate;
    private Timestamp lastModifiedDate;
    private Timestamp startedDate;

    private Timestamp endedDate;

    private List<QuestionBankDto> questionBankDtos;

}
