package com.thesurvey.api.dto.response;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyPageDto {

    private UUID surveyId;

    private Long authorId;

    private String title;

    private String description;

    private LocalDateTime startedDate;

    private LocalDateTime endedDate;

    private LocalDateTime modifiedDate;

    private List<CertificationType> certificationTypes;

}