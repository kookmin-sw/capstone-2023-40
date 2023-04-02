package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyUpdateRequestDto {
    @NotNull
    private UUID surveyId;

    @NotBlank(message = "제목은 필수 정보입니다.")
    private String title;

    private String description;
    @FutureOrPresent(message = "설문조사 시작일은 현재 시간 이후로 설정해야 합니다.")
    private LocalDateTime startedDate;
    @Future(message = "설문조사 종료일은 설문조사 시작일 이후로 설정해야 합니다.")
    private LocalDateTime endedDate;

    private List<CertificationType> certificationType;

    private List<QuestionBankUpdateRequestDto> questions;

}
