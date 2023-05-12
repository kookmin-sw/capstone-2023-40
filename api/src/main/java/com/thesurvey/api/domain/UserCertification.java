package com.thesurvey.api.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "user_certification")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserCertification {

    @EmbeddedId
    private UserCertificationId userCertificationId;

    @Valid
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @Column(name = "certification_type", insertable = false, updatable = false)
    private CertificationType certificationType;

    @Column(name = "certification_date", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime certificationDate;

    @Column(name = "expiration_date", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime expirationDate;

    @Builder
    public UserCertification(User user, CertificationType certificationType,
        LocalDateTime certificationDate, LocalDateTime expirationDate) {
        this.user = user;
        this.certificationType = certificationType;
        this.certificationDate = certificationDate;
        this.userCertificationId = UserCertificationId.builder()
            .userId(user.getUserId())
            .certificationType(certificationType)
            .build();
        this.expirationDate = expirationDate;
    }

}