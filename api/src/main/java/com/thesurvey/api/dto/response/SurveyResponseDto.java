package com.thesurvey.api.dto.response;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyResponseDto {

    @Schema(example = "93c0a231-207e-4190-aee9-0a5f78cafc44", description = "생성된 설문조사의 아이디입니다.")
    private UUID surveyId;

    @Schema(example = "1", description = "설문조사 생성자의 아이디입니다.")
    private Long authorId;

    @Schema(example = "카카오 사용자분들께 설문 부탁드립니다!", description = "생성된 설문조사의 제목입니다.")
    private String title;

    @Schema(example = "카카오 앱 서비스에 대한 전반적인 만족도 조사입니다.", description = "생성된 설문조사의 제목입니다.")
    private String description;

    @Schema(example = "2030-12-01T00:00:00", description = "생성된 설문조사의 시작일입니다.")
    private LocalDateTime startedDate;

    @Schema(example = "2030-12-12T00:00:00", description = "생성된 설문조사의 종료일입니다.")
    private LocalDateTime endedDate;

    private List<QuestionBankResponseDto> questions;

    @Schema(example = "2023-04-22T00:00:00", description = "생성된 설문조사의 생성일입니다.")
    private LocalDateTime createdDate;

    @Schema(example = "2023-04-22T00:00:00", description = "생성된 설문조사의 수정일입니다.")
    private LocalDateTime modifiedDate;

    @Schema(example = "[\"NAVER\", \"KAKAO\"]", description = "생성된 설문조사의 필수인증 목록입니다.")
    private List<CertificationType> certificationTypes;

}
