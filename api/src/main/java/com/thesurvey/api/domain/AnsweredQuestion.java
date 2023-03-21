package com.thesurvey.api.domain;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "answered_question")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnsweredQuestion {

    @EmbeddedId
    private AnsweredQuestionId answeredQuestionId;

    @Column(name = "single_choice", nullable = true)
    private Integer singleChoice;

    // FIXME: modify to join columns
    @Column(name = "multiple_choice", nullable = true)
    private Integer multipleChoice;

    @Column(name = "short_answer", nullable = true)
    private String shortAnswer;

    @Column(name = "long_answer", nullable = true)
    private String longAnswer;

    @Column(name = "type", nullable = false)
    private String type;

    @Builder
    public AnsweredQuestion(AnsweredQuestionId answeredQuestionId, Integer singleChoice,
        Integer multipleChoice,
        String shortAnswer, String longAnswer, String type) {
        this.answeredQuestionId = answeredQuestionId;
        this.shortAnswer = shortAnswer;
        this.longAnswer = longAnswer;
        this.singleChoice = singleChoice;
        this.multipleChoice = multipleChoice;
        this.type = type;

    }
}