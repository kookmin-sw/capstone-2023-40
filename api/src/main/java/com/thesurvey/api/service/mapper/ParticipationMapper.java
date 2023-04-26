package com.thesurvey.api.service.mapper;

import java.time.LocalDateTime;
import java.time.ZoneId;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;

import org.springframework.stereotype.Component;

@Component
public class ParticipationMapper {

    public Participation toParticipation(User user, Survey survey,
        CertificationType certificationType) {
        return Participation.builder()
            .user(user)
            .survey(survey)
            .certificationType(certificationType)
            .participateDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .submittedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .build();
    }
}
