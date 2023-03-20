package com.thesurvey.api.domain;

import java.io.Serializable;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
public class ParticipationId implements Serializable {

    @Column(name = "survey_id")
    private UUID surveyId;

    @Column(name = "user_id")
    private Long userId;
}
