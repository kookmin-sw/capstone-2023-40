package com.thesurvey.api.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.repository.QuestionRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class QuestionServiceTest {

    @Autowired
    QuestionService questionService;
    @Autowired
    QuestionRepository questionRepository;

    @Test
    void addQuestion() {
        Question question1 = new Question("what's your name?");
        Question question2 = new Question("what's your id?");
        List<Question> questions = Arrays.asList(question1, question2);

        List<Question> savedQuestions = questionService.addQuestion(questions);

        Question savedQuestion1 = savedQuestions.get(0);
        Question savedQuestion2 = savedQuestions.get(1);
        assertEquals(questions.size(), savedQuestions.size());
        assertEquals(question1.getContent(), savedQuestion1.getContent());
        assertEquals(question2.getContent(), savedQuestion2.getContent());
    }

}
