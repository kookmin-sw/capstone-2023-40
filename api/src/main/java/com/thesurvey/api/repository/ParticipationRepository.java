package com.thesurvey.api.repository;

import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.ParticipationId;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipationRepository extends JpaRepository<Participation, ParticipationId> {

    @Query("SELECT p FROM Participation p WHERE p.survey.surveyId = :surveyId")
    List<Participation> findAllBySurveyId(UUID surveyId);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Participation p WHERE p.user.userId = :userId AND p.survey.surveyId = :surveyId")
    boolean existsByUserIdAndSurveyId(Long userId, UUID surveyId);
}
