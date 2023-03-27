package com.thesurvey.api.domain;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnsweredQuestionId implements Serializable {

    @Column(name = "user_id")
    private Long userId;
    @Column(name = "survey_id")
    private UUID surveyId;
    @Column(name = "question_bank_id")
    private Long questionBankId;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AnsweredQuestionId that = (AnsweredQuestionId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(surveyId, that.surveyId)
            && Objects.equals(questionBankId, that.questionBankId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, surveyId, questionBankId);
    }

}
