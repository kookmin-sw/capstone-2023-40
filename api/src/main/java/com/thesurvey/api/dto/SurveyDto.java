package com.thesurvey.api.dto;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.Survey;
import java.sql.Timestamp;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class SurveyDto {

    private String title;
    private List<Question> questions;
    private Timestamp createdDate;

    public SurveyDto(Survey survey) {
        this.title = survey.getTitle();
        this.questions = survey.getQuestions();
        this.createdDate = survey.getCreatedDate();
    }

    @Builder
    public SurveyDto(String title, List<Question> questions, Timestamp createdDate) {
        this.title = title;
        this.questions = questions;
        this.createdDate = createdDate;
    }

    public Survey toEntity() {
        return Survey.builder().title(this.getTitle())
            .questions(this.getQuestions())
            .createdDate(this.getCreatedDate())
            .build();
    }
}
