package com.thesurvey.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.thesurvey.api.domain.QuestionBank;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionBankRepository extends JpaRepository<QuestionBank, Long> {

    Optional<QuestionBank> findByQuestionBankId(Long questionBankId);

    @Query("SELECT qb FROM QuestionBank qb JOIN FETCH qb.questions q JOIN q.survey s WHERE q.questionId.surveyId= :surveyId")
    Optional<List<QuestionBank>> findAllBySurveyId(UUID surveyId);

}
