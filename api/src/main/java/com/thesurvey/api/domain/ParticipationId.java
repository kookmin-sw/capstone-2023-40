package com.thesurvey.api.domain;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Embeddable
@Getter
public class ParticipationId implements Serializable {

    @ManyToOne
    private Survey survey;

    @ManyToOne
    private User user;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ParticipationId that = (ParticipationId) o;
        return Objects.equals(survey, that.survey) && Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(survey, user);
    }
}
