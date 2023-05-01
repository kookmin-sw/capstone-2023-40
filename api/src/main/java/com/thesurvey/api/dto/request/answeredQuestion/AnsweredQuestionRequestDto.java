package com.thesurvey.api.dto.request.answeredQuestion;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

// FIXME: this should be fixed since answers should only have one of 4 question types
@Getter
@Builder
public class AnsweredQuestionRequestDto {

    @NotEmpty
    List<@Valid AnsweredQuestionDto> answers;

    @NotNull
    @Schema(example = "93c0a231-207e-4190-aee9-0a5f78cafc44", description = "수정하려는 설문조사의 아이디입니다.")
    private UUID surveyId;

    @Schema(example = "[\"NAVER\", \"KAKAO\"]", description = "설문 참가자의 인증 유형을 지정합니다. 인증 유형은 다음의 값들이 올 수 있습니다: [\"NAVER\", \"KAKAO\", \"GOGLE\", \"WEBMAIL\", \"DRIVER_LICENSE\", \"MOBILE_PHONE\"]")
    private List<@Valid CertificationType> certificationTypes;

}
