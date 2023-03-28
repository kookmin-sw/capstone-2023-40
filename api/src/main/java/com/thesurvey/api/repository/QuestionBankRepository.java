package com.thesurvey.api.repository;

import com.thesurvey.api.domain.QuestionBank;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionBankRepository extends JpaRepository<QuestionBank, Long> {

    Optional<QuestionBank> findByQuestionBankId(Long questionBankId);
}
