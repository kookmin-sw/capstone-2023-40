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
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "survey_item")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SurveyItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemNo;
    @Column(name = "title", nullable = true)
    private String title;
    @ManyToOne
    @JoinColumn(name = "surveyId", referencedColumnName = "id")
    private Survey survey;

}