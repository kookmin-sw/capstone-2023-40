package com.thesurvey.api.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.repository.SurveyRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class SurveyServiceTest {

    @Autowired
    SurveyRepository surveyRepository;
    @Autowired
    SurveyService surveyService;
    @Autowired
    QuestionService questionService;

    @Test
    void createSurvey() {
        String title = "title";
        Question question1 = new Question("what's your name?");
        Question question2 = new Question("what's your id?");
        List<Question> questions = Arrays.asList(question1, question2);

        Survey survey = new Survey(title, questions);
        surveyService.createSurvey(survey);
        questionService.addQuestion(survey.getQuestions());

        Optional<Survey> savedSurvey = surveyService.getSurveyById(survey.getSurveyId());
        assertNotNull(savedSurvey);
        assertEquals(title, savedSurvey.get().getTitle());
        assertEquals(questions.size(), savedSurvey.get().getQuestions().size());


    }

}
