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
import com.thesurvey.api.service.mapper.ParticipationMapper;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ParticipationService {

    private final UserRepository userRepository;

    private final ParticipationRepository participationRepository;

    private final ParticipationMapper participationMapper;

    public ParticipationService(UserRepository userRepository,
        ParticipationRepository participationRepository, ParticipationMapper participationMapper) {
        this.userRepository = userRepository;
        this.participationRepository = participationRepository;
        this.participationMapper = participationMapper;
    }

    @Transactional
    public void createParticipation(Authentication authentication,
        SurveyRequestDto surveyRequestDto, Survey survey) {
        User user = userRepository.findByName(authentication.getName())
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));

        surveyRequestDto.getCertificationType().stream()
            .map((certificationType) -> participationMapper.toParticipation(user, survey,
                certificationType))
            .forEach(participationRepository::save);
    }

    @Transactional
    public void deleteParticipation(UUID surveyId) {
        List<Participation> participationList = participationRepository.findAllByParticipationId_surveyId(
            surveyId);
        participationRepository.deleteAll(participationList);
    }
}
