package com.thesurvey.api.repository;

import java.util.List;
import java.util.Optional;

import com.thesurvey.api.domain.QuestionOption;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Long> {

    @Query("SELECT qo.option FROM QuestionOption qo WHERE qo.questionOptionId = :questionOptionId")
    Optional<String> findOptionByQuestionOptionId(Long questionOptionId);

    @Query("SELECT qo FROM QuestionOption qo WHERE qo.questionOptionId = :questionOptionId AND qo.questionBank.questionBankId = :questionBankId")
    Optional<QuestionOption> findByQuestionOptionIdAndQuestionBankId(Long questionOptionId,
        Long questionBankId);

    @Query("SELECT qo FROM QuestionOption qo WHERE qo.questionBank.questionBankId = :questionBankId")
    Optional<List<QuestionOption>> findAllByQuestionBankId(Long questionBankId);
}
