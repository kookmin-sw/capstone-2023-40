package com.thesurvey.api.domain;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionId implements Serializable {
    @Column(name = "survey_id")
    private UUID surveyId;
    @Column(name = "question_bank_id")
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
