package com.thesurvey.api.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.util.AssertionErrors.assertTrue;
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
        String title = "My name is Jin";
        Question question1 = new Question("what's your name?");
        Question question2 = new Question("what's your id?");
        List<Question> questions = Arrays.asList(question1, question2);

        Survey survey = new Survey(title, questions);
        Survey newSurvey = surveyService.createSurvey(survey);
        questionService.addQuestion(survey.getQuestions());

        Optional<Survey> savedSurvey = surveyService.getSurveyById(newSurvey.getSurveyId());
        assertNotNull(savedSurvey);
        assertEquals(title, savedSurvey.get().getTitle());
        assertEquals(questions.size(), savedSurvey.get().getQuestions().size());


    }

    @Test
    void getSurveyById() {
        String title = "My name is Jin";
        Question question1 = new Question("what's your name?");
        Question question2 = new Question("what's your id?");
        List<Question> questions = Arrays.asList(question1, question2);
        Survey survey = new Survey(title, questions);
        Survey newSurvey = surveyService.createSurvey(survey);
        questionService.addQuestion(survey.getQuestions());

        Optional<Survey> targetSurvey = surveyService.getSurveyById(newSurvey.getSurveyId());

        assertEquals(survey.getSurveyId(), targetSurvey.get().getSurveyId());
        assertEquals(survey.getTitle(), targetSurvey.get().getTitle());
        assertEquals(survey.getQuestions().get(1).getContent(),
            targetSurvey.get().getQuestions().get(1).getContent());


    }

}
