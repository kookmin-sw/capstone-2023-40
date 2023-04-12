package com.thesurvey.api.service.converter;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CertificationTypeConverter {

    /**
     * Converts certificationTypeList type from Integer to CertificationType.
     *
     * @param certificationTypeList List converted from CertificationType to Integer in db.
     * @return convertedCertificationTypeList List converted from Integer to CertificationType.
     */
    public List<CertificationType> toCertificationTypeList(List<Integer> certificationTypeList) {
        return certificationTypeList.stream()
            .map(type -> {
                switch (type) {
                    case 0:
                        return CertificationType.KAKAO;
                    case 1:
                        return CertificationType.NAVER;
                    case 2:
                        return CertificationType.GOOGLE;
                    case 3:
                        return CertificationType.WEBMAIL;
                    case 4:
                        return CertificationType.DRIVER_LICENSE;
                    case 5:
                        return CertificationType.MOBILE_PHONE;
                    default:
                        return null;
                }
            })
            .collect(Collectors.toList());
    }
}
