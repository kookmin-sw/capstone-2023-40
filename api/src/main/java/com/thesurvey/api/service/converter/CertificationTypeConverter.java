package com.thesurvey.api.service.converter;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CertificationTypeConverter {

    /*
     * Integer is set to the index of EnumTypeEntity.CertificationType.
     * value : CertificationType
     * 0: KAKAO, 1: NAVER, 2: GOOGLE, 3: WEBMAIL, 4: DRIVER_LICENSE, 5: MOBILE_PHONE
     */
    public List<CertificationType> toCertificationTypeList(List<Integer> certificationTypeList) {
        List<CertificationType> convertedCertificationTypeList = new ArrayList<>();
        for (Integer type : certificationTypeList) {

            if (type.intValue() == 0) {
                convertedCertificationTypeList.add(CertificationType.KAKAO);
            }
            else if (type.intValue() == 1) {
                convertedCertificationTypeList.add(CertificationType.NAVER);
            }
            else if (type.intValue() == 2) {
                convertedCertificationTypeList.add(CertificationType.GOOGLE);
            }
            else if (type.intValue() == 3) {
                convertedCertificationTypeList.add(CertificationType.WEBMAIL);
            }
            else if (type.intValue() == 4) {
                convertedCertificationTypeList.add(CertificationType.DRIVER_LICENSE);
            }
            else if (type.intValue() == 5) {
                convertedCertificationTypeList.add(CertificationType.MOBILE_PHONE);
            }
            
        }
        return convertedCertificationTypeList;
    }
}
