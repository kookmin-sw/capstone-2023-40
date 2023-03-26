package com.thesurvey.api.domain;

public class EnumTypeEntity {
    public enum QuestionType {
        SINGLE_CHOICE,
        MULTIPLE_CHOICE,
        SHORT_ANSWER,
        LONG_ANSWER
    }

    public enum CertificationType {
        KAKAO,
        NAVER,
        GOOGLE,
        WEBMAIL,
        DRIVER_LICENSE,
        MOBILE_PHONE
    }
    public enum Role {
        USER,
        ADMIN
    }



}
