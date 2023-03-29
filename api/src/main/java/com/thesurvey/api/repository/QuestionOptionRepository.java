package com.thesurvey.api.repository;

import com.thesurvey.api.domain.QuestionOption;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Long> {

    Optional<QuestionOption> findByQuestionOptionId(Long questionOptionId);
}
