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
     * NONE, KAKAO, NAVER, GOOGLE, WEBMAIL, DRIVER_LICENSE, IDENTITY_CARD.
     * The NONE type is used as the certificationType when creating a survey
     * that do not require user certification.
     * {@code certificationTypeId} is the ID value that is saved in the database.
     */
    public enum CertificationType {

        NONE(0),

        KAKAO(1),

        NAVER(2),

        GOOGLE(3),

        WEBMAIL(4),

        DRIVER_LICENSE(5),

        IDENTITY_CARD(6);

        @Getter
        private final int certificationTypeId;

        CertificationType(int certificationTypeId) {
            this.certificationTypeId = certificationTypeId;
        }
    }

    public enum PointTransactionType {

        SINGLE_CHOICE_REWARD(1),
        SINGLE_CHOICE_CONSUME(2),

        MULTIPLE_CHOICES_REWARD(2),
        MULTIPLE_CHOICES_CONSUME(4),

        SHORT_ANSWER_REWARD(2),
        SHORT_ANSWER_CONSUME(4),

        LONG_ANSWER_REWARD(3),
        LONG_ANSWER_CONSUME(6);

        @Getter
        private final int transactionPoint;

        PointTransactionType(int transactionPoint) {
            this.transactionPoint = transactionPoint;
        }
    }

    public enum Role {
        USER,
        ADMIN
    }

}
