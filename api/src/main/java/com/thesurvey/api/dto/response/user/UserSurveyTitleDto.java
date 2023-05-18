package com.thesurvey.api.dto.response.user;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

import lombok.Getter;

@Getter
public class UserSurveyTitleDto {

    @Schema(example = "93c0a231-207e-4190-aee9-0a5f78cafc44", description = "조회된 설문조사 아이디입니다.")
    private UUID surveyId;

    @Schema(example = "카카오 사용자분들께 설문 부탁드립니다!", description = "조회된 설문조사 제목입니다.")
    private String title;

    public UserSurveyTitleDto(UUID surveyId, String title) {
        this.surveyId = surveyId;
        this.title = title;
    }
}
