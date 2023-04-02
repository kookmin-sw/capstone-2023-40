package com.thesurvey.api.dto.request;

import java.util.List;
import java.util.UUID;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnsweredQuestionRequestDto {

    @NotNull(message = "유효하지 않은 설문조사입니다.")
    private UUID surveyId;

    @NotNull(message = "질문에 대한 응답을 등록해야합니다.")
    List<AnsweredQuestionDto> questionList;

}
