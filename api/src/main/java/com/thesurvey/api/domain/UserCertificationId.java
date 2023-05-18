package com.thesurvey.api.domain;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserCertificationId implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    /*
     * the value of id is set to the index of EnumTypeEntity.CertificationType.
     * the value of id : CertificationType
     * 0: NONE, 1: KAKAO, 2: NAVER, 3: GOOGLE, 4: WEBMAIL, 5: DRIVER_LICENSE, 6: IDENTITY_CARD
     */
    @Column(name = "certification_type")
    private CertificationType certificationType;

    @Builder
    public UserCertificationId(Long userId, CertificationType certificationType) {
        this.userId = userId;
        this.certificationType = certificationType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserCertificationId that = (UserCertificationId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(certificationType,
            that.certificationType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, certificationType);
    }

}