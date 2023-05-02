package com.thesurvey.api.dto.response.question;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankAnswerDto {

    @Schema(example = "1", description = "조회된 설문조사에 속하는 질문은행 아이디입니다.")
    private Long questionBankId;

    @Schema(example = "카카오톡 서비스 사용자이신가요?", description = "질문은행 아이디에 해당하는 질문 제목입니다.")
    private String questionTitle;

    @Schema(example = "카카오톡 사용자여부 확인", description = "질문은행 아이디에 해당하는 질문 내용입니다.")
    private String questionDescription;

    @Schema(example = "SINGLE_CHOICE", description = "질문은행 아이디에 해당하는 질문 유형입니다.")
    private QuestionType questionType;

    @Schema(example = "1", description = "각 질문의 순서를 결정하는 번호로, 양수여야 합니다.")
    private Integer questionNo;

    @Schema(example = "[\"편리합니다\", \"좋아요!\"]", description = "주관식 답변 모음입니다.")
    List<String> textAnswers;

    @Schema(example = "["
        + "[\"questionOptionId\": 2,\n"
        + "\"option\": \"예\",\n"
        + "\"responseNumber\": 1]]", description = "객관식 답변 모음입니다.")
    List<QuestionOptionAnswerDto> optionAnswers;


}
