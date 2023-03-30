package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyRequestDto {

    private String title;

    private String description;

    private LocalDateTime startedDate;

    private LocalDateTime endedDate;

    private List<CertificationType> certificationType;

    private List<QuestionRequestDto> questions;

}
