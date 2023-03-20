package com.thesurvey.api.domain;

import java.io.Serializable;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
public class AnsweredQuestionId implements Serializable {

    @Column(name = "survey_id")
    private UUID surveyId;

    @Column(name = "question_bank_id")
    private Long questionBankId;

    @Column(name = "user_id")
    private Long userId;
}
