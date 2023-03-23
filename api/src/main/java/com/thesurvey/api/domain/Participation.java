package com.thesurvey.api.domain;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "participation")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Participation {

    @EmbeddedId
    @Column(name = "participation_id")
    private ParticipationId participationId;

    @Column(name = "participate_date", nullable = false)
    private LocalDateTime participateDate;

    @Column(name = "submitted_date", nullable = false)
    private LocalDateTime submittedDate;

    @Enumerated(EnumType.STRING)
    private CertificationType certificationType;

}
