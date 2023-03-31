package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyUpdateRequestDto {
    @NotBlank
    private UUID surveyId;

    @NotBlank
    private String title;

    private String description;
    @FutureOrPresent
    private LocalDateTime startedDate;
    @Future
    private LocalDateTime endedDate;

    private List<CertificationType> certificationType;

    @NotBlank
    private List<QuestionBankUpdateRequestDto> questions;

}
