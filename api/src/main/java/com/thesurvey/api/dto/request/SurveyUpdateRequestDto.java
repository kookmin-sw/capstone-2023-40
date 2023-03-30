package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyUpdateRequestDto {

    private UUID surveyId;

    private String title;

    private String description;

    private LocalDateTime startedDate;

    private LocalDateTime endedDate;

    private List<CertificationType> certificationType;

    private List<QuestionBankUpdateRequestDto> questions;

}
