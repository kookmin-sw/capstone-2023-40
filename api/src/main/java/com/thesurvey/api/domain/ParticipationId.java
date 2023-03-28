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

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ParticipationId implements Serializable {

    @Column(name = "survey_id")
    private UUID surveyId;
    @Column(name = "user_id")
    private Long userId;

    @Builder
    public ParticipationId(UUID surveyId, Long userId) {
        this.surveyId = surveyId;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ParticipationId that = (ParticipationId) o;
        return Objects.equals(surveyId, that.surveyId) && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(surveyId, userId);
    }
}
