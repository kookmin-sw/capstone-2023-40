package com.thesurvey.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Table(name = "question_option")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_no")
    private Long optionNo;

    @Column(name = "option", nullable = false)
    private String option;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @Setter
    @JoinColumn(name = "question_bank_id")
    private QuestionBank questionBank;

    @Builder
    public QuestionOption (QuestionBank questionBank, String option, String description) {
        this.questionBank = questionBank;
        this.option = option;
        this.description = description;
    }
}
