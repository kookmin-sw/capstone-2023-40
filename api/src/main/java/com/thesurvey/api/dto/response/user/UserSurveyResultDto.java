package com.thesurvey.api.dto.response.user;

import com.thesurvey.api.dto.response.question.QuestionBankAnswerDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserSurveyResultDto {

    @Schema(example = "93c0a231-207e-4190-aee9-0a5f78cafc44", description = "조회된 설문조사 아이디입니다.")
    private UUID surveyId;

    @Schema(example = "카카오 사용자분들께 설문 부탁드립니다!", description = "조회된 설문조사의 제목입니다.")
    private String surveyTitle;

    private List<QuestionBankAnswerDto> results;

}
