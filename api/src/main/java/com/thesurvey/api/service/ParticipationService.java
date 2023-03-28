package com.thesurvey.api.service;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.UserRepository;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ParticipationService {

    private final UserRepository userRepository;
    private final ParticipationRepository participationRepository;

    public ParticipationService(UserRepository userRepository,
        ParticipationRepository participationRepository) {
        this.userRepository = userRepository;
        this.participationRepository = participationRepository;
    }

    @Transactional
    public void createParticipation(Authentication authentication,
        SurveyRequestDto surveyRequestDto, Survey survey) {
        User user = userRepository.findByName(authentication.getName())
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));

        for (CertificationType certificationType : surveyRequestDto.getCertificationType()) {
            Participation participation = Participation.builder()
                .user(user)
                .survey(survey)
                .certificationType(certificationType)
                .participateDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .submittedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build();
            participationRepository.save(participation);
        }
    }

    @Transactional
    public void deleteParticipation(UUID surveyId) {
        List<Participation> participationList = participationRepository.findAllByParticipationId_surveyId(
            surveyId);
        participationRepository.deleteAll(participationList);
    }
}
