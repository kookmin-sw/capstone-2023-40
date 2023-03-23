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
@Table(name = "answered_question")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnsweredQuestion {

    @EmbeddedId
    private AnsweredQuestionId answeredQuestionId;

    @MapsId("surveyId")
    @ManyToOne
    @JoinColumn(name = "survey_id")
    public Survey survey;

    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;

    @MapsId("questionBankId")
    @ManyToOne
    @JoinColumn(name = "question_bank_id")
    public QuestionBank questionBank;

    @Column(name = "single_choice", nullable = true)
    private String singleChoice;

    // FIXME: modify to join columns
    @Column(name = "multiple_choices", nullable = true)
    private String multipleChoices;

    @Column(name = "short_answer", nullable = true)
    private String shortAnswer;

    @Column(name = "long_answer", nullable = true)
    private String longAnswer;


    @Builder
    public AnsweredQuestion(String singleChoice,
        String multipleChoices,
        String shortAnswer, String longAnswer) {
        this.shortAnswer = shortAnswer;
        this.longAnswer = longAnswer;
        this.singleChoice = singleChoice;
        this.multipleChoices = multipleChoices;

    }
}