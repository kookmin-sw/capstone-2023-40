package com.thesurvey.api.domain;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("surveyId")
    @JoinColumn(name = "survey_id")
    public Survey survey;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("questionBankId")
    @JoinColumn(name = "question_bank_id")
    public QuestionBank questionBank;

    @Column(name = "question_no", nullable = false)
    private int questionNo;

    @Column(name = "is_required", nullable = false)
    private boolean isRequired;

    @Builder
    public Question(QuestionBank questionBank, Survey survey, int questionNo, boolean isRequired) {
        this.survey = survey;
        this.questionBank = questionBank;
        this.questionNo = questionNo;
        this.isRequired = isRequired;
        this.questionId = QuestionId.builder()
            .surveyId(survey.getSurveyId())
            .questionBankId(questionBank.getQuestionBankId())
            .build();
    }
}
