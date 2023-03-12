package com.thesurvey.api.domain;

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

@Entity
@Table(name = "answered_survey_item")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnsweredSurveyItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne
    @JoinColumn(name = "surveyId")
    private Survey survey;
    @ManyToOne
    @JoinColumn(name = "itemId", referencedColumnName = "itemNo")
    private SurveyItem surveyItem;

}
