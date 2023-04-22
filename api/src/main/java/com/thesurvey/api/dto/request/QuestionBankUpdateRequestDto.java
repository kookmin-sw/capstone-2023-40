package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankUpdateRequestDto {

    @NotNull
    @Positive
    @Schema(example = "1", description = "수정하려는 질문은행 아이디입니다. 질문은행 아이디는 양수여야합니다.")
    private Long questionBankId;

    @Size(max = 100)
    @Schema(example = "카카오 헤어 서비스 사용자이신가요?", description = "수정하려는 질문은행 제목입니다. 질문 제목은 100자 이내여야 합니다.")
    private String title;

    @Size(max = 255)
    @Schema(example = "카카오 헤어 서비스 사용자 여부 확인", description = "수정하려는 질문 상세내용입니다. 질문 상세내용은 255자 이내여야 합니다.")
    private String description;

    @Valid
    @Schema(example = "SINGLE_CHOICE", description = "질문 유형에는 다음의 값들이 올 수 있습니다: \"SINGLE_CHOICE\" \"MULTIPLE_CHOICE\" \"SHORT_ANSWER\" \"LONG_ANSWER\"")
    private QuestionType questionType;

    @Schema(example = "true", description = "필수질문 여부입니다.")
    private Boolean isRequired;

    @Positive
    @Schema(example = "1", description = "질문 번호입니다. 설문조사 질문의 순서를 결정합니다.")
    private Integer questionNo;

    @Valid
    private List<QuestionOptionUpdateRequestDto> questionOptions;
}
