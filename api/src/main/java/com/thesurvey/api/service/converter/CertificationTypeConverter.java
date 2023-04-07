package com.thesurvey.api.service.converter;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CertificationTypeConverter {

    /**
     * return List<Integer> certificationTypeList to
     * List<CertificationType> convertedCertificationTypeList.
     * @param certificationTypeList List converted from CertificationType to Integer in db.
     * @return convertedCertificationTypeList List converted from Integer to CertificationType.
     */
    public List<CertificationType> toCertificationTypeList(List<Integer> certificationTypeList) {
        List<CertificationType> convertedCertificationTypeList = new ArrayList<>();
        for (Integer type : certificationTypeList) {

            if (type == 0) {
                convertedCertificationTypeList.add(CertificationType.KAKAO);
            }
            else if (type == 1) {
                convertedCertificationTypeList.add(CertificationType.NAVER);
            }
            else if (type == 2) {
                convertedCertificationTypeList.add(CertificationType.GOOGLE);
            }
            else if (type == 3) {
                convertedCertificationTypeList.add(CertificationType.WEBMAIL);
            }
            else if (type == 4) {
                convertedCertificationTypeList.add(CertificationType.DRIVER_LICENSE);
            }
            else if (type == 5) {
                convertedCertificationTypeList.add(CertificationType.MOBILE_PHONE);
            }

        }
        return convertedCertificationTypeList;
    }
}
