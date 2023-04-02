package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyRequestDto {
    @NotBlank(message = "설문조사 제목은 필수 정보입니다.")
    @ApiModelProperty(name = "설문조사 제목", example = "카카오 사용자분들께 설문 부탁드립니다!")
    private String title;

    @ApiModelProperty(name = "설문조사 상세내용", example = "카카오 앱 서비스에 대한 전반적인 만족도 조사입니다.")
    private String description;

    @FutureOrPresent(message = "설문조사 시작일은 현재 시간 이후로 설정해야 합니다.")
    @ApiModelProperty(name = "설문조사 시작일", example = "2023-04-01T00:00:00")
    private LocalDateTime startedDate;

    @Future(message = "설문조사 종료일은 설문조사 시작일 이후로 설정해야 합니다.")
    @ApiModelProperty(name = "설문조사 종료일", example = "2023-04-08T00:00:00")
    private LocalDateTime endedDate;

    private List<CertificationType> certificationType;

    @NotNull(message = "질문을 하나 이상 등록해야 합니다.")
    private List<QuestionRequestDto> questions;

}
