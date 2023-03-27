package com.thesurvey.api.repository;

import com.thesurvey.api.domain.Survey;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, UUID> {

    @Query("SELECT s FROM Survey s JOIN FETCH s.questions q JOIN q.questionBank qb WHERE s.surveyId = :survey_id")
    Optional<Survey> findBySurveyIdWithRelatedQuestionBank(@Param("survey_id") UUID surveyId);
}
