package com.thesurvey.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionId;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, QuestionId> {

    @Query("SELECT q FROM Question q WHERE q.survey.surveyId = :surveyId ORDER BY q.questionNo ASC")
    List<Question> findAllBySurveyId(UUID surveyId);

    @Query("SELECT q FROM Question q WHERE q.questionBank.questionBankId = :questionBankId")
    Optional<Question> findByQuestionBankId(Long questionBankId);

    @Query("SELECT CASE WHEN COUNT(q) < 0 THEN true ELSE false END FROM Question q WHERE q.questionId.surveyId = :surveyId AND q.questionId.questionBankId = :questionBankId")
    boolean notExistsBySurveyIdAndQuestionBankId(UUID surveyId, Long questionBankId);
}
