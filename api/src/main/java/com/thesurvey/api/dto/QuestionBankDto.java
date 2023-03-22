package com.thesurvey.api.dto;

import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.domain.QuestionType;
import java.util.List;
import javax.persistence.Column;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionBankDto {

    private String title;

    private String description;

    private String question;

    private QuestionType questionType;

    private List<QuestionOption> questionOptions;

}
