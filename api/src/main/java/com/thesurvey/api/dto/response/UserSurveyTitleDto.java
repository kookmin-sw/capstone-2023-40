package com.thesurvey.api.dto.response;

import java.util.UUID;
import lombok.Getter;

@Getter
public class UserSurveyTitleDto {

    private UUID surveyId;

    private String title;

    public UserSurveyTitleDto(UUID surveyId, String title) {
        this.surveyId = surveyId;
        this.title = title;
    }
}
