package com.thesurvey.api.repository;

import com.thesurvey.api.domain.Survey;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, UUID> {

    @Override
    List<Survey> findAll();

    @Override
    Survey save(Survey survey);

    @Override
    Optional<Survey> findById(UUID surveyId);
}
