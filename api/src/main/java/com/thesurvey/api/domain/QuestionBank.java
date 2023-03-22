package com.thesurvey.api.domain;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_bank_id")
    private Long questionBankId;
    @OneToMany(
        mappedBy = "questionId.questionBank",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Question> questions;

    @OneToMany(
        mappedBy = "optionNo",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<QuestionOption> questionOptions;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "question", nullable = true)
    private String question;

    @Column(name = "type", nullable = true)
    private QuestionType questionType;

    @Builder
    public QuestionBank(String title, String description, String question, QuestionType questionType, List<QuestionOption> questionOptions) {
        this.title = title;
        this.description = description;
        this.question = question;
        this.questionType = questionType;
        this.questionOptions = questionOptions;
    }

}
