

package com.thesurvey.api.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyListPageDto {

    List<SurveyPageDto> surveys;

    Integer page;

    Long totalSurveys;

    Integer totalPages;

}

