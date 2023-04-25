package com.thesurvey.api.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankResponseDto {

    @Schema(example = "1", description = "생성된 설문조사에 속하는 질문은행 아이디입니다.")
    private Long questionBankId;

    @Schema(example = "카카오톡 서비스 사용자이신가요?", description = "질문은행 아이디에 해당하는 질문 제목입니다.")
    private String title;

    @Schema(example = "카카오톡 사용자여부 확인", description = "질문은행 아이디에 해당하는 질문 내용입니다.")
    private String description;

    @Schema(example = "SINGLE_CHOICE", description = "질문은행 아이디에 해당하는 질문 유형입니다.")
    private QuestionType questionType;

    private List<QuestionOptionResponseDto> questionOptions;

    @Schema(example = "", description = "질문은행 아이디에 해당하는 질문 유형입니다.")
    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

}
