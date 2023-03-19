package com.thesurvey.api.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
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
@Table(name = "survey")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Survey extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_id")
    private UUID surveyId;
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "survey", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Question> questions;

    @OneToMany(mappedBy = "survey", fetch = FetchType.LAZY)
    private List<Participation> participations = new ArrayList<>();

    @Builder
    public Survey(String title, String description, List<Question> questions,
        List<Participation> participations) {
        this.title = title;
        this.description = description;
        this.questions = questions;
        this.participations = participations;
    }

}
