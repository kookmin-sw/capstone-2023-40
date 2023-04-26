package com.thesurvey.api.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionInfoDto {

    @Schema(example = "1", description = "참여한 설문은행 아이디입니다.")
    private Long questionBankId;

    @Schema(example = "카카오톡 서비스 사용자이신가요?", description = "참여한 설문조사 문항의 제목입니다.")
    private String questionTitle;

    @Schema(example = "카카오톡 사용자여부 확인", description = "참여한 설문조사 문항의 제목입니다.")
    private String questionDescription;

    @Schema(example = "1", description = "참여한 설문조사의 단일 선택 항목의 응답 내용입니다.")
    private Integer singleChoice;

    @Schema(example = "[1, 3]", description = "참여한 설문조사의 복수 선택 항목의 응답 내용입니다.")
    private List<Integer> multipleChoices;

    @Schema(example = "단답형 응답 내용입니다.", description = "참여한 설문조사의 단답형 응답 내용입니다.")
    private String shortAnswer;

    @Schema(example = "장문형 응답 내용입니다.", description = "참여한 설문조사의 장문형 응답 내용입니다.")
    private String longAnswer;

}
