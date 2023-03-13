package com.thesurvey.api.domain;

import java.util.List;
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
    @OneToMany(mappedBy = "survey")
//    @JsonManagedReference
    private List<Question> question;

    @Builder
    public Survey(Long surveyId, String title) {
        this.surveyId = surveyId;
        this.title = title;
    }

}
