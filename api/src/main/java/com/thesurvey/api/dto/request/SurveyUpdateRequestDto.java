package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyUpdateRequestDto {

    @NotNull
    private UUID surveyId;

    @NotBlank
    @Size(max = 100)
    private String title;

    @NotBlank
    @Size(max = 255)
    private String description;

    @NotNull
    @FutureOrPresent
    private LocalDateTime startedDate;

    @NotNull
    @Future
    private LocalDateTime endedDate;

    private List<CertificationType> certificationType;

    @Valid
    @NotNull
    @NotEmpty
    private List<QuestionBankUpdateRequestDto> questions;

}
