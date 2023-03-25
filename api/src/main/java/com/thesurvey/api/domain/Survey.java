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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

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
    @OneToMany(
        mappedBy = "survey",
        cascade = CascadeType.PERSIST,
        orphanRemoval = true
    )
    private List<Question> questions;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "started_date", nullable = true)
    private LocalDateTime startedDate;

    @Column(name = "ended_date", nullable = true)
    private LocalDateTime endedDate;

    @Builder
    public Survey(String title, List<Question> questions, String description,
        LocalDateTime startedDate, LocalDateTime endedDate) {
        this.title = title;
        this.questions = questions;
        this.description = description;
        this.startedDate = startedDate;
        this.endedDate = endedDate;
    }

}
