package com.thesurvey.api.dto.request.survey;

import com.thesurvey.api.dto.request.question.QuestionRequestDto;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyRequestDto {

    @NotBlank
    @Size(max = 100)
    @Schema(example = "카카오 사용자분들께 설문 부탁드립니다!", description = "설문조사 제목은 100자 이내여야 합니다.")
    private String title;

    @NotBlank
    @Size(max = 255)
    @Schema(example = "카카오 앱 서비스에 대한 전반적인 만족도 조사입니다.", description = "설문조사 상세내용은 255자 이내여야 합니다.")
    private String description;

    @NotNull
    @Schema(example = "2030-12-01T00:00:00", description = "설문조사 시작일은 요청시각 기준 5초 이전은 불가능합니다.")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startedDate;

    @NotNull
    @Future
    @Schema(example = "2030-12-12T00:00:00", description = "설문조사 종료일은 설문조사 시작일보다 빠를 수 없습니다.")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endedDate;

    @Valid
    @Schema(example = "[\"NAVER\", \"KAKAO\"]", description = "설문 참가자의 인증 유형을 지정합니다. 인증 유형은 다음의 값들이 올 수 있습니다: [\"NAVER\", \"KAKAO\", \"GOGLE\", \"WEBMAIL\", \"DRIVER_LICENSE\", \"MOBILE_PHONE\"]")
    private List<CertificationType> certificationTypes;

    @Valid
    @NotEmpty
    private List<QuestionRequestDto> questions;

}
