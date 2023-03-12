package com.thesurvey.api.domain;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "survey_answer")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SurveyAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "submittedDate", nullable = false)
    private Timestamp submittedDate;
    @ManyToOne
    @JoinColumn(name = "surveyId")
    private Survey survey;
}
