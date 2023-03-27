package com.thesurvey.api.controller;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.service.SurveyService;
import com.thesurvey.api.service.UserService;
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
    private final UserService userService;

    public SurveyController(SurveyService surveyService, UserService userService) {
        this.surveyService = surveyService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Optional<SurveyDto>>> getAllSurvey() {
        return ResponseEntity.ok(surveyService.getAllSurvey());
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<Optional<Optional<Survey>>> getSurveyById(@PathVariable UUID surveyId) {
        return ResponseEntity.ok(
            Optional.ofNullable(surveyService.getSurveyByIdWithRelatedQuestion(surveyId)));
    }

    @PostMapping
    public ResponseEntity<Survey> createSurvey(@RequestBody SurveyRequestDto surveyRequestDto) {
        return ResponseEntity.ok(surveyService.createSurvey(surveyRequestDto));
    }

//    @PostMapping("/submit")
//    public ResponseEntity<Survey> submitSurvey(@RequestBody SurveyDto requestedSurveyDto) {
//        return ResponseEntity.ok(surveyService.respondSurvey(requestedSurveyDto));
//    }
}
