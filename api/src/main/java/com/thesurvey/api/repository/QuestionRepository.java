package com.thesurvey.api.repository;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionId;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, QuestionId> {

    List<Question> findAllByQuestionId_surveyId(UUID surveyId);
    Question findByQuestionId_QuestionBankId(Long questionBankId);
}
