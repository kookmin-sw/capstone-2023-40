package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.domain.Question;
import com.thesurvey.api.dto.QuestionOptionDto;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionRequestDto {

    private String title;

    private String description;

    private QuestionType questionType;

    private int questionNo;

    private boolean isRequired;

    private List<Question> questions;

    private List<QuestionOptionDto> questionOptions;
}
