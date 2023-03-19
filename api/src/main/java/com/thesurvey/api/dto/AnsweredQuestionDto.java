package com.thesurvey.api.dto;

import com.thesurvey.api.domain.AnsweredQuestion;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AnsweredQuestionDto {
    private String shortAnswer;

    public AnsweredQuestionDto(AnsweredQuestion answeredQuestion) {
        this.shortAnswer = answeredQuestion.getShortAnswer();
    }
    @Builder
    public AnsweredQuestion toEntity(String shortAnswer) {
        return AnsweredQuestion.builder().shortAnswer(shortAnswer)
            .build();
    }
}
