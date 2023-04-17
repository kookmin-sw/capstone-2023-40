package com.thesurvey.api.domain;

import com.thesurvey.api.exception.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ErrorMessage;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
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

    @NotNull
    @Positive
    @Column(name = "question_no", nullable = false)
    private Integer questionNo;

    @NotNull
    @Column(name = "is_required", nullable = false)
    private Boolean isRequired;

    @Builder
    public Question(QuestionBank questionBank, Survey survey, Integer questionNo, Boolean isRequired) {
        this.survey = survey;
        this.questionBank = questionBank;
        this.questionNo = questionNo;
        this.isRequired = isRequired;
        this.questionId = QuestionId.builder()
            .surveyId(survey.getSurveyId())
            .questionBankId(questionBank.getQuestionBankId())
            .build();
    }

    public void changeQuestionNo(Integer questionNo) {
        if (questionNo <= 0) {
            throw new BadRequestExceptionMapper(ErrorMessage.POSITIVE_VALUE_REQUIRED, "질문번호");
        }
        this.questionNo = questionNo;
    }

    public void changeIsRequired(Boolean isRequired) {
        this.isRequired = isRequired;
    }
}
