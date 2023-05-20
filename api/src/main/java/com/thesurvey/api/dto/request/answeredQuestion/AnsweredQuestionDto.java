package com.thesurvey.api.dto.request.answeredQuestion;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionDto {

    @NotNull
    @Schema(example = "1", description = "응답하려는 설문은행 아이디입니다.")
    private Long questionBankId;

    @NotNull
    @Schema(example = "true", description = "답변한 질문의 필수 질문 여부입니다.")
    private Boolean isRequired;

    @NotNull
    @Schema(example = "SINGLE_CHOICE", description = "답변한 질문 유형입니다.")
    private QuestionType questionType;

    @Positive
    @Schema(example = "2", description = "응답하려는 단일 선택 항목의 번호입니다.")
    private Long singleChoice;

    @Size(min = 1)
    @Schema(example = "[1, 3]", description = "응답하려는 복수 선택 항목의 번호입니다.")
    private List<Long> multipleChoices;

    @Size(max = 100)
    @Schema(example = "단답형 응답 내용입니다.", description = "응답하려는 단답형 내용입니다. 단답형 내용은 100자 이내여야 합니다.")
    private String shortAnswer;

    @Size(max = 255)
    @Schema(example = "장문형 응답 내용입니다.", description = "응답하려는 단답형 내용입니다. 장문형 내용은 255자 이내여야 합니다.")
    private String longAnswer;

}
