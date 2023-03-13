package com.thesurvey.api.domain;

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
    @JoinColumn(name = "survey_id")
    private Survey survey;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    @Builder
    public AnsweredQuestion(Long answeredQuestionId) {
        this.answeredQuestionId = answeredQuestionId;
    }

}
