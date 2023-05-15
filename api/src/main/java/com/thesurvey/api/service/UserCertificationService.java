package com.thesurvey.api.service;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.domain.UserCertification;
import com.thesurvey.api.dto.request.user.UserCertificationUpdateRequestDto;
import com.thesurvey.api.dto.response.userCertification.UserCertificationListDto;
import com.thesurvey.api.repository.UserCertificationRepository;
import com.thesurvey.api.service.mapper.UserCertificationMapper;
import com.thesurvey.api.util.UserUtil;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserCertificationService {

    private final UserCertificationRepository userCertificationRepository;

    private final UserCertificationMapper userCertificationMapper;

    public UserCertificationService(UserCertificationRepository userCertificationRepository,
        UserCertificationMapper userCertificationMapper) {
        this.userCertificationRepository = userCertificationRepository;
        this.userCertificationMapper = userCertificationMapper;
    }

    @Transactional(readOnly = true)
    public UserCertificationListDto getUserCertifications(Authentication authentication) {
        Long userId = UserUtil.getUserIdFromAuthentication(authentication);
        return userCertificationMapper.toUserCertificationListDto(userId);
    }

    @Transactional
    public UserCertificationListDto updateUserCertification(Authentication authentication,
        UserCertificationUpdateRequestDto userCertificationUpdateRequestDto) {
        User user = UserUtil.getUserFromAuthentication(authentication);
        List<Integer> userCertificationList =
            userCertificationRepository.findUserCertificationTypeByUserId(user.getUserId());

        if (userCertificationUpdateRequestDto.getIsKakaoCertificated()) {
            saveUserCertification(user, CertificationType.KAKAO, userCertificationList);
        }

        if (userCertificationUpdateRequestDto.getIsNaverCertificated()) {
            saveUserCertification(user, CertificationType.NAVER, userCertificationList);
        }

        if (userCertificationUpdateRequestDto.getIsGoogleCertificated()) {
            saveUserCertification(user, CertificationType.GOOGLE, userCertificationList);
        }

        if (userCertificationUpdateRequestDto.getIsWebMailCertificated()) {
            saveUserCertification(user, CertificationType.WEBMAIL, userCertificationList);
        }

        if (userCertificationUpdateRequestDto.getIsDriverLicenseCertificated()) {
            saveUserCertification(user, CertificationType.DRIVER_LICENSE, userCertificationList);
        }

        if (userCertificationUpdateRequestDto.getIsIdentityCardCertificated()) {
            saveUserCertification(user, CertificationType.IDENTITY_CARD, userCertificationList);
        }

        return userCertificationMapper.toUserCertificationListDto(user.getUserId());
    }

    /**
     * This method is a scheduled task that runs every day at midnight
     * (in the "Asia/Seoul" timezone) to delete expired user certifications from the database.
     */
    @Scheduled(cron = "0 0 0 * * ?")
    public void deleteExpiredCertificates() {
        userCertificationRepository.deleteByExpirationDateLessThanEqual(
            LocalDateTime.now(ZoneId.of("Asia/Seoul")));
    }

    private void saveUserCertification(User user, CertificationType certificationType,
        List<Integer> userCertificationList) {
        if (!userCertificationList.contains(certificationType.getCertificationTypeId())) {
            userCertificationRepository.save(buildUserCertification(user, certificationType));
        }
    }

    private UserCertification buildUserCertification(User user, CertificationType certificationType) {
        return UserCertification.builder()
            .user(user)
            .certificationType(certificationType)
            .certificationDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            // The expiration date is set to 2 years after the current date.
            .expirationDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusYears(2))
            .build();
    }
}