package com.thesurvey.api.repository;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, QuestionId> {

}