package com.thesurvey.api.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.thesurvey.api.exception.mapper.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "survey")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Survey extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "survey_id", columnDefinition = "uuid")
    private UUID surveyId;

    @OneToMany(
        mappedBy = "survey",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Participation> participations;

    @Size(min = 1)
    @OneToMany(
        mappedBy = "survey",
        cascade = CascadeType.PERSIST,
        orphanRemoval = true
    )
    private List<Question> questions;

    @NotNull
    @Positive
    @Column(name = "author_id", updatable = false, nullable = false)
    private Long authorId;

    @NotBlank
    @Size(max = 100)
    @Column(name = "title", nullable = false)
    private String title;

    @NotBlank
    @Size(max = 255)
    @Column(name = "description", nullable = true)
    private String description;

    @NotNull
    @Column(name = "started_date", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startedDate;

    @NotNull
    @Future
    @Column(name = "ended_date", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endedDate;

    @Builder
    public Survey(Long authorId, String title, List<Question> questions,
        List<Participation> participations, String description, LocalDateTime startedDate,
        LocalDateTime endedDate) {
        this.authorId = authorId;
        this.title = title;
        this.participations = participations;
        this.questions = questions;
        this.description = description;
        this.startedDate = startedDate;
        this.endedDate = endedDate;
    }

    public void changeTitle(String title) {
        if (title.length() > 100) {
            throw new BadRequestExceptionMapper(ErrorMessage.MAX_SIZE_EXCEEDED, "제목", 100);
        }
        this.title = title;
    }

    public void changeDescription(String description) {
        if (description.length() > 255) {
            throw new BadRequestExceptionMapper(ErrorMessage.MAX_SIZE_EXCEEDED, "설명", 255);
        }
        this.description = description;
    }

    public void changeStartedDate(LocalDateTime startedDate) {
        this.startedDate = startedDate;
    }

    public void changeEndedDate(LocalDateTime endedDate) {
        this.endedDate = endedDate;
    }
}
