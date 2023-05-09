package com.thesurvey.api.domain;

import lombok.Getter;

public class EnumTypeEntity {

    public enum QuestionType {
        SINGLE_CHOICE,
        MULTIPLE_CHOICES,
        SHORT_ANSWER,
        LONG_ANSWER
    }

    /**
     * {@link CertificationType} represents various types of certifications
     * that can be used for user certification.
     * The available certification types are
     * KAKAO, NAVER, GOOGLE, WEBMAIL, DRIVER_LICENSE, IDENTITY_CARD.
     * {@code certificationTypeId} is the ID value that is saved in the database.
     */
    public enum CertificationType {

        KAKAO(0),

        NAVER(1),

        GOOGLE(2),

        WEBMAIL(3),

        DRIVER_LICENSE(4),

        IDENTITY_CARD(5);

        @Getter
        private final int certificationTypeId;

        CertificationType(int certificationTypeId) {
            this.certificationTypeId = certificationTypeId;
        }
    }

    public enum Role {
        USER,
        ADMIN
    }

}
