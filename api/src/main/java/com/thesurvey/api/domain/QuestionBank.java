package com.thesurvey.api.domain;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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

    @OneToMany(mappedBy = "questionBank", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Question> questions;

    @OneToMany(mappedBy = "questionBank", fetch = FetchType.EAGER ,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionOption> questionOptions;

    @Column(name = "title", nullable = true)
    private String title;

    @Column(name = "description", nullable = true)
    private String description;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @Builder
    public QuestionBank(String title, String description, QuestionType type,
        List<Question> questions, List<QuestionOption> questionOptions) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.questions = questions;
        this.questionOptions = questionOptions;
    }

}
