package com.thesurvey.api.dto;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.QuestionBank;
import java.sql.Timestamp;
import java.time.LocalDateTime;
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

    private LocalDateTime startedDate;

    private LocalDateTime endedDate;

    private List<QuestionBank> questionBank;

    private CertificationType certificationType;

}
