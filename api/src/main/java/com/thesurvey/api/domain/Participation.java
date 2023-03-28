package com.thesurvey.api.domain;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.service.converter.CertificationTypeConverter;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "participation")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Participation {

    @EmbeddedId
    private ParticipationId participationId;

    @MapsId("surveyId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id")
    public Survey survey;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;

    @Column(name = "participate_date", nullable = false)
    private LocalDateTime participateDate;

    @Column(name = "submitted_date", nullable = false)
    private LocalDateTime submittedDate;

    @Convert(converter = CertificationTypeConverter.class)
    private CertificationType certificationType;

    @Builder
    public Participation(Survey survey, User user,
        LocalDateTime participateDate, LocalDateTime submittedDate,
        CertificationType certificationType) {
        this.survey = survey;
        this.user = user;
        this.participateDate = participateDate;
        this.submittedDate = submittedDate;
        this.certificationType = certificationType;
        this.participationId = ParticipationId.builder()
            .surveyId(survey.getSurveyId())
            .userId(user.getUserId())
            .build();
    }

}
