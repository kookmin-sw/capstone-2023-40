package com.thesurvey.api.service;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.util.List;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final QuestionService questionService;
    private final SurveyMapper surveyMapper;

    public SurveyService(SurveyRepository surveyRepository, QuestionService questionService,
        SurveyMapper surveyMapper) {
        this.surveyRepository = surveyRepository;
        this.questionService = questionService;
        this.surveyMapper = surveyMapper;
    }

    public List<Survey> getAllSurvey() {
        return surveyRepository.findAll();
    }

    public SurveyDto getSurveyById(UUID surveyId) {
        return surveyMapper.toSurveyDto(surveyRepository.findById(surveyId))
            .orElseThrow(() -> new EntityNotFoundException("Survey not found"));
    }

    @Transactional
    public Survey createSurvey(Survey survey) {
        Survey newSurvey = surveyRepository.save(survey);
        questionService.addQuestion(newSurvey.getQuestions());
        return newSurvey;
    }

}
