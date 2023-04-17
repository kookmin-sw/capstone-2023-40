package com.thesurvey.api.domain;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
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

    /*
     * the value of id is set to the index of EnumTypeEntity.CertificationType.
     * the value of id : CertificationType
     * 0: KAKAO, 1: NAVER, 2: GOOGLE, 3: WEBMAIL, 4: DRIVER_LICENSE, 5: MOBILE_PHONE
     */
    @Column(name = "certification_type")
    private CertificationType certificationType;

    @Column(name = "survey_id")
    private UUID surveyId;

    @Column(name = "user_id")
    private Long userId;

    @Builder
    public ParticipationId(CertificationType certificationType, UUID surveyId, Long userId) {
        this.certificationType = certificationType;
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
