package com.thesurvey.api.dto.response.survey;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyListPageDto {

    List<SurveyPageDto> surveys;

    @Schema(example = "1", description = "조회된 설문조사 목록의 페이지 번호입니다.")
    Integer page;

    @Schema(example = "80", description = "조회된 모든 설문조사의 개수입니다.")
    Long totalSurveys;

    @Schema(example = "10", description = "조회된 모든 설문조사의 페이지 수 입니다.")
    Integer totalPages;

}

