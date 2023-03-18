package com.thesurvey.api.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.ArrayList;
import java.util.List;
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
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_id")
    private Long surveyId;
    @Column(name = "title", nullable = false)
    private String title;
    @OneToMany(mappedBy = "survey", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Question> questions;

    @OneToMany(mappedBy = "survey", fetch = FetchType.LAZY)
    private List<Participation> participations = new ArrayList<>();

    @Builder
    public Survey(String title, List<Question> questions) {
        this.title = title;
        this.questions = questions;
    }

}
