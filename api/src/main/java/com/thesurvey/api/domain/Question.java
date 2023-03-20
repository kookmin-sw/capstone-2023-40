package com.thesurvey.api.domain;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "question")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question {

    @EmbeddedId
    @Column(name = "question_id")
    private QuestionId questionId;

    @Column(name = "description", nullable = true)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id")
    private Survey survey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_bank_id", insertable = false, updatable = false)
    private QuestionBank questionBank;

    @Builder
    public Question(QuestionId questionId, String description, Survey survey) {
        this.questionId = questionId;
        this.description = description;
        this.survey = survey;
    }
}
