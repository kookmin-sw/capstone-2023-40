package com.thesurvey.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "question_bank")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionBank {

    @Id
    @Column(name = "question_bank_id")
    private Long questionBankId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "type", nullable = false)
    private String type;

}
