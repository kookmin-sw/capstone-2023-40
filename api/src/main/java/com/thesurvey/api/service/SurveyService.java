package com.thesurvey.api.service;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.repository.SurveyRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final QuestionService questionService;

    public SurveyService(SurveyRepository surveyRepository, QuestionService questionService) {
        this.surveyRepository = surveyRepository;
        this.questionService = questionService;
    }

    public List<Survey> getAllSurvey() {
        return surveyRepository.findAll();
    }

    public Optional<Survey> getSurveyById(long surveyId) {
        Optional<Survey> targetSurvey = surveyRepository.findById(surveyId);
        return Optional.of(targetSurvey.get());
    }

    public Survey createSurvey(Survey survey) {
        Survey newSurvey = surveyRepository.save(survey);
        questionService.addQuestion(newSurvey.getQuestions());
        return newSurvey;
    }


}
