package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyUpdateRequestDto {

    @NotNull
    private UUID surveyId;

    @Size(max = 100)
    private String title;

    @Size(max = 255)
    private String description;

    private LocalDateTime startedDate;

    @Future
    private LocalDateTime endedDate;

    @Valid
    private List<CertificationType> certificationTypes;

    @Valid
    private List<QuestionBankUpdateRequestDto> questions;

}
