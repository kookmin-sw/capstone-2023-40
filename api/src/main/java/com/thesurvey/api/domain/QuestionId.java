package com.thesurvey.api.domain;

import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Embeddable
@Getter
public class QuestionId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "survey_id")
    private Survey survey;

    @ManyToOne
    @JoinColumn(name = "question_bank_id")
    private QuestionBank questionBank;

}
