package com.thesurvey.api.controller;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.service.SurveyService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/survey")
public class SurveyController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Optional<SurveyDto>>> getAllSurvey() {
        List<Optional<SurveyDto>> surveyList = surveyService.getAllSurveyDto();
        return ResponseEntity.ok(surveyList);
    }
    @GetMapping("/{surveyId}")
    public ResponseEntity<Optional<SurveyDto>> getSurveyById(@PathVariable UUID surveyId) {
        return ResponseEntity.ok(Optional.ofNullable(surveyService.getSurveyById(surveyId)));
    }

    @PostMapping
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey survey) {
        Survey newSurvey = surveyService.createSurvey(survey);
        return ResponseEntity.ok(newSurvey);
    }
}
