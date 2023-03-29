package com.thesurvey.api.controller;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyInfoDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.service.SurveyService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/surveys")
public class SurveyController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping
    public ResponseEntity<List<Optional<SurveyInfoDto>>> getAllSurvey() {
        return ResponseEntity.ok(surveyService.getAllSurvey());
    }
    // Need to test
    @GetMapping("/{surveyId}")
    public ResponseEntity<Optional<Optional<Survey>>> getSurveyById(@PathVariable UUID surveyId) {
        return ResponseEntity.ok(
            Optional.ofNullable(surveyService.getSurveyByIdWithRelatedQuestion(surveyId)));
    }

    @PostMapping
    public ResponseEntity<SurveyInfoDto> createSurvey(Authentication authentication,
        @RequestBody SurveyRequestDto surveyRequestDto) {
        return ResponseEntity.ok(surveyService.createSurvey(authentication, surveyRequestDto));
    }

    @PostMapping("/update")
    public ResponseEntity<SurveyInfoDto> updateSurvey(@RequestBody SurveyUpdateRequestDto surveyUpdateRequestDto) {
        return ResponseEntity.ok(surveyService.updateSurvey(surveyUpdateRequestDto));
    }

    @DeleteMapping("/{surveyId}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable("surveyId") String surveyId) {
        surveyService.deleteSurvey(UUID.fromString(surveyId));
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/submit")
//    public ResponseEntity<Survey> submitSurvey(@RequestBody SurveyDto requestedSurveyDto) {
//        return ResponseEntity.ok(surveyService.respondSurvey(requestedSurveyDto));
//    }
}
