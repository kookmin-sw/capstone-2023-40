package com.thesurvey.api.service.mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.UserCertification;
import com.thesurvey.api.dto.response.userCertification.CertificationInfo;
import com.thesurvey.api.dto.response.userCertification.UserCertificationListDto;
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

        List<CertificationInfo<CertificationType>> certificationInfoList = new ArrayList<>();
        for (UserCertification userCertification : userCertificationList) {
            CertificationType certificationType = userCertification.getCertificationType();
            certificationInfoList.add(getCertificationInfo(certificationType, userCertification.getExpirationDate()));
        }
        return UserCertificationListDto.builder()
            .certificationInfoList(certificationInfoList)
            .build();
    }

    private CertificationInfo<CertificationType> getCertificationInfo(CertificationType certificationType, LocalDateTime expirationDate) {
        return CertificationInfo.<CertificationType>builder()
            .certificationName(certificationType.name())
            .expirationDate(expirationDate)
            .isCertificated(true)
            .build();
    }

}
