package com.thesurvey.api.domain;

import com.thesurvey.api.exception.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ErrorMessage;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "question_option")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_option_id")
    private Long questionOptionId;

    @NotBlank
    @Size(max = 100)
    @Column(name = "option", nullable = false)
    private String option;

    @Size(max = 255)
    @Column(name = "description")
    private String description;

    @Valid
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_bank_id")
    private QuestionBank questionBank;

    @Builder
    public QuestionOption(QuestionBank questionBank, String option, String description) {
        this.questionBank = questionBank;
        this.option = option;
        this.description = description;
    }

    public void changeOption(String option) {
        if (option.length() > 100) {
            throw new BadRequestExceptionMapper(ErrorMessage.MAX_SIZE_EXCEEDED, "옵션 제목", 100);
        }
        this.option = option;
    }

    public void changeDescription(String description) {
        if (description.length() > 255) {
            throw new BadRequestExceptionMapper(ErrorMessage.MAX_SIZE_EXCEEDED, "옵션 설명", 255);
        }
        this.description = description;
    }

}
