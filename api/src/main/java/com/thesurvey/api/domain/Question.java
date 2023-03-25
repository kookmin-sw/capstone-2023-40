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

    @ManyToOne
    @MapsId("surveyId")
    @JoinColumn(name = "survey_id")
    public Survey survey;

    @ManyToOne
    @MapsId("questionBankId")
    @JoinColumn(name = "question_bank_id")
    public QuestionBank questionBank;

    @Column(name = "question_no", nullable = false)
    private int questionNo;

    @Column(name = "description", nullable = true)
    private String description;

    @Builder
    public Question(QuestionBank questionBank, Survey survey, int questionNo, String description) {
        this.questionId = new QuestionId(survey.getSurveyId(), questionBank.getQuestionBankId());
        this.survey = survey;
        this.questionBank = questionBank;
        this.questionNo = questionNo;
        this.description = description;
    }
}
