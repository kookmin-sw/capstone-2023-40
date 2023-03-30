package com.thesurvey.api.repository;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, QuestionId> {

    @Query("SELECT q FROM Question q WHERE q.survey.surveyId = :surveyId ORDER BY q.questionNo ASC")
    List<Question> findAllBySurveyId(UUID surveyId);

    @Query("SELECT q FROM Question q WHERE q.questionBank.questionBankId = :questionBankId")
    Optional<Question> findByQuestionBankId(Long questionBankId);
}
