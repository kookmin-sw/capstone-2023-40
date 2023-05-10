package com.thesurvey.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.ParticipationId;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipationRepository extends JpaRepository<Participation, ParticipationId> {

    @Query("SELECT p FROM Participation p WHERE p.survey.surveyId = :surveyId")
    Optional<List<Participation>> findAllBySurveyId(UUID surveyId);

}
