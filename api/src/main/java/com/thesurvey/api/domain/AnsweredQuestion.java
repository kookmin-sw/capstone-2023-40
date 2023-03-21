package com.thesurvey.api.domain;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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

    @Id
    @Column(name = "answered_question_id")
    private Long answeredQuestionId;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_bank_id")
    private QuestionBank questionBank;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id")
    private Survey survey;

    @Builder
    public AnsweredQuestion(Long answeredQuestionId, User user, Survey survey,
        Question question,
        String shortAnswer) {
        this.answeredQuestionId = answeredQuestionId;
        this.user = user;
        this.survey = survey;
        this.question = question;
        this.shortAnswer = shortAnswer;

    }
}