package com.thesurvey.api.repository;

import com.thesurvey.api.domain.AnsweredQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnsweredQuestionRepository extends JpaRepository<AnsweredQuestion, Long> {

}
