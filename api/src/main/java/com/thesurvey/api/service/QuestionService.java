package com.thesurvey.api.service;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.repository.QuestionRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question getQuestionById(Long id) {
        Optional<Question> targetQuestion = questionRepository.findById(id);
        return targetQuestion.get();
    }
    public List<Question> addQuestion(List<Question> questionList){
        return questionRepository.saveAll(questionList);
    }
}
