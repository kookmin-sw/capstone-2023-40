package com.thesurvey.api.service;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.repository.QuestionRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
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

    public List<Optional<SurveyDto>> getAllSurveyDto() {
        return surveyRepository.findAll().stream()
            .map(survey -> surveyMapper.toSurveyDto(Optional.ofNullable(survey)))
            .collect(Collectors.toList());
    }

    public SurveyDto getSurveyById(UUID surveyId) {
        return surveyMapper.toSurveyDto(surveyRepository.findById(surveyId))
            .orElseThrow(() -> new EntityNotFoundException("Survey not found"));
    }

    @Transactional
    public Survey createSurvey(Survey survey) {
//        questionService.addQuestion(survey.getQuestions());
        return surveyRepository.save(survey);
    }

}
