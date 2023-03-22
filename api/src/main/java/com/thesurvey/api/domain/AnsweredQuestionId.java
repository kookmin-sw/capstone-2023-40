package com.thesurvey.api.domain;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Embeddable
@Getter
public class AnsweredQuestionId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "survey_id")
    private Survey survey;

    @ManyToOne
    @JoinColumn(name = "question_bank_id")
    private QuestionBank questionBank;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AnsweredQuestionId that = (AnsweredQuestionId) o;
        return Objects.equals(user, that.user) && Objects.equals(survey, that.survey)
            && Objects.equals(questionBank, that.questionBank);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, survey, questionBank);
    }

}
