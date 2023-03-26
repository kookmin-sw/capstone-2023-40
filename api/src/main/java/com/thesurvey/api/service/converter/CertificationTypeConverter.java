package com.thesurvey.api.service.converter;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class CertificationTypeConverter implements
    AttributeConverter<CertificationType, Character> {

    @Override
    public Character convertToDatabaseColumn(CertificationType type) {
        switch (type) {
            case GOOGLE:
                return 'G';

            case NAVER:
                return 'N';

            case WEBMAIL:
                return 'W';

            case DRIVER_LICENSE:
                return 'D';

            case MOBILE_PHONE:
                return 'M';

            case KAKAO:
                return 'K';

            default:
                throw new IllegalArgumentException(type + " not supported.");
        }
    }

    @Override
    public CertificationType convertToEntityAttribute(Character type) {
        if (type == null) {
            return null;
        }

        switch (type) {
            case 'G':
                return CertificationType.GOOGLE;

            case 'N':
                return CertificationType.NAVER;

            case 'W':
                return CertificationType.WEBMAIL;

            case 'D':
                return CertificationType.DRIVER_LICENSE;

            case 'M':
                return CertificationType.MOBILE_PHONE;

            case 'K':
                return CertificationType.KAKAO;

            default:
                throw new IllegalArgumentException(type + " not supported.");
        }
    }
}
