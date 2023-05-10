package com.thesurvey.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.AnsweredQuestionId;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnsweredQuestionRepository extends
    JpaRepository<AnsweredQuestion, AnsweredQuestionId> {
    @Query("SELECT aq FROM AnsweredQuestion aq WHERE aq.answeredQuestionId.surveyId = :surveyId")
    Optional<List<AnsweredQuestion>> findAllBySurveyId(UUID surveyId);

    @Query("SELECT aq FROM AnsweredQuestion aq WHERE aq.answeredQuestionId.questionBankId = :questionBankId")
    Optional<List<AnsweredQuestion>> findAllByQuestionBankId(Long questionBankId);

    @Query("SELECT CASE WHEN COUNT(aq) > 0 THEN true ELSE false END FROM AnsweredQuestion aq WHERE aq.answeredQuestionId.userId = :userId AND aq.answeredQuestionId.surveyId = :surveyId")
    boolean existsByUserIdAndSurveyId(Long userId, UUID surveyId);

    @Query("SELECT aq.singleChoice, COUNT(aq) FROM AnsweredQuestion aq WHERE aq.questionBank.questionBankId = :questionBankId GROUP BY aq.singleChoice")
    Optional<List<Long[]>> countSingleChoiceByQuestionBankId(Long questionBankId);

    @Query("SELECT aq.multipleChoice, COUNT(aq) FROM AnsweredQuestion aq WHERE aq.questionBank.questionBankId = :questionBankId GROUP BY aq.multipleChoice")
    Optional<List<Long[]>> countMultipleChoiceByQuestionBankId(Long questionBankId);

}
