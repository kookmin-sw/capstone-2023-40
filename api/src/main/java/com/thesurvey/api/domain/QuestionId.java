package com.thesurvey.api.domain;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionId implements Serializable {

    @Column(name = "survey_id", columnDefinition = "uuid")
    private UUID surveyId;

    @Column(name = "question_bank_id")
    private Long questionBankId;

    @Builder
    public QuestionId(UUID surveyId, Long questionBankId) {
        this.surveyId = surveyId;
        this.questionBankId = questionBankId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        QuestionId that = (QuestionId) o;
        return Objects.equals(surveyId, that.surveyId) && Objects.equals(questionBankId,
            that.questionBankId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(surveyId, questionBankId);
    }

}
