package com.thesurvey.api.domain;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Embeddable
@Getter
public class QuestionId implements Serializable {

    private UUID surveyId;

    private Long questionBankId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuestionId that = (QuestionId) o;
        return Objects.equals(surveyId, that.surveyId) && Objects.equals(questionBankId, that.questionBankId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(surveyId, questionBankId);
    }

}
