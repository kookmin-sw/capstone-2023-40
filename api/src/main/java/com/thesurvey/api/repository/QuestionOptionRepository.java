package com.thesurvey.api.repository;

import com.thesurvey.api.domain.QuestionOption;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Long> {

    Optional<QuestionOption> findByQuestionOptionId(Long questionOptionId);
    @Query("SELECT qo FROM QuestionOption qo WHERE qo.questionBank.questionBankId = :questionBankId")
    List<QuestionOption> findByQuestionBankId(Long questionBankId);
}
