package com.thesurvey.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
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

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "question", nullable = true)
    private String question;

    @Column(name = "type", nullable = true)
    private String type;

    @Builder
    public QuestionBank(String title, String description, String question, String type) {
        this.title = title;
        this.description = description;
        this.question = question;
        this.type = type;
    }

}
