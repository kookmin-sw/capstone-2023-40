package com.thesurvey.api.dto.response;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyResponseDto {

    private UUID surveyId;

    private String title;

    private String description;

    private LocalDateTime startedDate;

    private LocalDateTime endedDate;

    private List<QuestionBankResponseDto> questions;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    private List<CertificationType> certificationType;

}
