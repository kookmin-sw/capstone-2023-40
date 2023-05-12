package com.thesurvey.api.service.mapper;

import java.time.LocalDateTime;
import java.util.List;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.UserCertification;
import com.thesurvey.api.dto.response.userCertification.DriverLicenseCertificationInfoDto;
import com.thesurvey.api.dto.response.userCertification.GoogleCertificationInfoDto;
import com.thesurvey.api.dto.response.userCertification.IdentityCardCertificationInfoDto;
import com.thesurvey.api.dto.response.userCertification.KakaoCertificationInfoDto;
import com.thesurvey.api.dto.response.userCertification.NaverCertificationInfoDto;
import com.thesurvey.api.dto.response.userCertification.UserCertificationListDto;
import com.thesurvey.api.dto.response.userCertification.WebMailCertificationInfoDto;
import com.thesurvey.api.repository.UserCertificationRepository;

import org.springframework.stereotype.Component;

@Component
public class UserCertificationMapper {

    private final UserCertificationRepository userCertificationRepository;

    public UserCertificationMapper(UserCertificationRepository userCertificationRepository) {
        this.userCertificationRepository = userCertificationRepository;
    }

    public UserCertificationListDto toUserCertificationListDto(Long userId) {
        List<UserCertification> userCertificationList =
            userCertificationRepository.findUserCertificationByUserId(userId);

        UserCertificationListDto userCertificationListDto = new UserCertificationListDto();
        for (UserCertification userCertification : userCertificationList) {
            CertificationType certificationType = userCertification.getCertificationType();
            setCertificationInfo(userCertificationListDto, userCertification, certificationType);
        }
        return userCertificationListDto;
    }

    public void setCertificationInfo(UserCertificationListDto userCertificationListDto,
        UserCertification userCertification,
        CertificationType certificationType) {
        LocalDateTime expirationDate = userCertification.getExpirationDate();
        switch (certificationType) {
            case KAKAO:
                userCertificationListDto.setKakaoCertificationInfo(
                    buildKakaoCertificationInfoDto(expirationDate)
                );
                break;

            case NAVER:
                userCertificationListDto.setNaverCertificationInfo(
                    buildNaverCertificationInfoDto(expirationDate)
                );
                break;

            case GOOGLE:
                userCertificationListDto.setGoogleCertificationInfo(
                    buildGoogleCertificationInfoDto(expirationDate)
                );
                break;

            case WEBMAIL:
                userCertificationListDto.setWebMailCertificationInfo(
                    buildWebMailCertificationInfoDto(expirationDate)
                );
                break;

            case DRIVER_LICENSE:
                userCertificationListDto.setDriverLicenseCertificationInfo(
                    buildDriverLicenseCertificationInfoDto(expirationDate)
                );
                break;

            case IDENTITY_CARD:
                userCertificationListDto.setIdentityCardCertificationInfo(
                    buildIdentityCardCertificationInfoDto(expirationDate)
                );
                break;
        }
    }

    private KakaoCertificationInfoDto buildKakaoCertificationInfoDto(LocalDateTime expirationDate) {
        return KakaoCertificationInfoDto.builder()
            .isCertificated(true)
            .expirationDate(expirationDate)
            .build();
    }

    private NaverCertificationInfoDto buildNaverCertificationInfoDto(LocalDateTime expirationDate) {
        return NaverCertificationInfoDto.builder()
            .isCertificated(true)
            .expirationDate(expirationDate)
            .build();
    }

    private GoogleCertificationInfoDto buildGoogleCertificationInfoDto(LocalDateTime expirationDate) {
        return GoogleCertificationInfoDto.builder()
            .isCertificated(true)
            .expirationDate(expirationDate)
            .build();
    }

    private WebMailCertificationInfoDto buildWebMailCertificationInfoDto(LocalDateTime expirationDate) {
        return WebMailCertificationInfoDto.builder()
            .isCertificated(true)
            .expirationDate(expirationDate)
            .build();
    }

    private DriverLicenseCertificationInfoDto buildDriverLicenseCertificationInfoDto(LocalDateTime expirationDate) {
        return DriverLicenseCertificationInfoDto.builder()
            .isCertificated(true)
            .expirationDate(expirationDate)
            .build();
    }

    private IdentityCardCertificationInfoDto buildIdentityCardCertificationInfoDto(LocalDateTime expirationDate) {
        return IdentityCardCertificationInfoDto.builder()
            .isCertificated(true)
            .expirationDate(expirationDate)
            .build();
    }

}
