package com.thesurvey.api.repository;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.AnsweredQuestionId;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnsweredQuestionRepository extends
    JpaRepository<AnsweredQuestion, AnsweredQuestionId> {
    @Query("SELECT aq FROM AnsweredQuestion aq WHERE aq.answeredQuestionId.surveyId = :surveyId")
    List<AnsweredQuestion> findAllBySurveyId(UUID surveyId);
}
