package com.thesurvey.api.dto.response.user;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserSurveyTitleListDto {

    private List<UserSurveyTitleDto> surveys;

}
