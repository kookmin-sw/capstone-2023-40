package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionRequestDto {

    @NotNull
    private UUID surveyId;

    private List<@Valid CertificationType> certificationTypes;

    @NotEmpty
    List<@Valid AnsweredQuestionDto> answers;

}
