package com.thesurvey.api.repository;

import com.thesurvey.api.domain.QuestionBank;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionBankRepository extends JpaRepository<QuestionBank, Long> {

    Optional<QuestionBank> findByQuestionBankId(Long questionBankId);
    @Query("SELECT qb FROM QuestionBank qb JOIN FETCH qb.questions q JOIN q.survey s WHERE q.questionId.surveyId= :surveyId")
    List<QuestionBank> findAllBySurveyId(UUID surveyId);
    @Query("SELECT qb FROM QuestionBank qb JOIN FETCH qb.questions q JOIN q.survey s WHERE q.questionId.surveyId = :surveyId AND qb.title = :title")
    Optional<QuestionBank> findBySurveyIdAndTitle(UUID surveyId, String title);

}
