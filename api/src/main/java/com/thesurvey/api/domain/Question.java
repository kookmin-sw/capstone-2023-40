package com.thesurvey.api.domain;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
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
    private QuestionId questionId;

    @MapsId("surveyId")
    @ManyToOne
    @JoinColumn(name = "survey_id")
    public Survey survey;

    @MapsId("questionBankId")
    @ManyToOne
    @JoinColumn(name = "question_bank_id")
    public QuestionBank questionBank;

    @Column(name = "question_no", nullable = false)
    private int questionNo;

    @Column(name = "description", nullable = true)
    private String description;

    @Builder
    public Question(QuestionId questionId, int questionNo, String description) {
        this.questionId = questionId;
        this.questionNo = questionNo;
        this.description = description;
    }
}
