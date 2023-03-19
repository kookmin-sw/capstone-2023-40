package com.thesurvey.api.domain;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answered_question_id")
    private Long answeredQuestionId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    @ManyToOne
    @JoinColumn(name = "survey_id")
    private Survey survey;
    @Column(name = "short_answer", nullable = true)
    private String shortAnswer;

    @Builder
    public AnsweredQuestion(Long answeredQuestionId, User user, Survey survey, Question question, String shortAnswer) {
        this.answeredQuestionId = answeredQuestionId;
        this.user = user;
        this.survey = survey;
        this.question = question;
        this.shortAnswer = shortAnswer;
    }

}
