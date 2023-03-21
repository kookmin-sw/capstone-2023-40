package com.thesurvey.api.dto;

import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionBank;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyDto {

    private UUID surveyId;

    private String title;

    private String description;

    private Timestamp endedDate;

    private List<QuestionBank> questionBanks;

}
