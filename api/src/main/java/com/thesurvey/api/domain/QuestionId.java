package com.thesurvey.api.domain;

import java.io.Serializable;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
public class QuestionId implements Serializable {

    @Column(name = "survey_id")
    private UUID survey_id;

    @Column (name = "question_bank_id")
    private Long questionBankId;

}
