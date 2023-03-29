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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "설문조사")
@RestController
@RequestMapping("/surveys")
public class SurveyController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @ApiOperation(value = "모든 설문조사 조회", notes = "모든 설문조사를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "사용자 인증 실패"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음")
    })
    @GetMapping
    public ResponseEntity<List<Optional<SurveyInfoDto>>> getAllSurvey() {
        return ResponseEntity.ok(surveyService.getAllSurvey());
    }

    @ApiOperation(value = "설문조사 조회", notes = "파라미터로 전달 받은 UUID에 해당하는 설문조사를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "사용자 인증 실패"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음")
    })
    @GetMapping("/{surveyId}")
    public ResponseEntity<SurveyInfoDto> getSurvey(
        @ApiParam(value = "UUID 형식의 surveyId", required = true)
        @PathVariable UUID surveyId) {
        return ResponseEntity.ok(surveyService.getSurveyBySurveyIdWithRelatedQuestion(surveyId));
    }

    @ApiOperation(value = "설문조사 생성", notes = "새로운 설문조사를 생성합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "사용자 인증 실패"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음"),
        @ApiResponse(code = 500, message = "서버 내부 오류")
    })
    @PostMapping
    public ResponseEntity<SurveyInfoDto> createSurvey(Authentication authentication,
        @ApiParam(value = "SurveyRequestDto 객체", required = true)
        @RequestBody SurveyRequestDto surveyRequestDto) {
        return ResponseEntity.ok(surveyService.createSurvey(authentication, surveyRequestDto));
    }


    @ApiOperation(value = "설문조사 수정", notes = "설문조사 내용을 수정합니다. 아래의 모든 필드를 담아 전송해야 합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "사용자 인증 실패"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음"),
        @ApiResponse(code = 500, message = "서버 내부 오류")
    })
    @PutMapping
    public ResponseEntity<SurveyInfoDto> updateSurvey(
        @ApiParam(value = "SurveyUpdateRequestDto 객체", required = true)
        @RequestBody SurveyUpdateRequestDto surveyUpdateRequestDto) {
        return ResponseEntity.ok(surveyService.updateSurvey(surveyUpdateRequestDto));
    }

    @ApiOperation(value = "설문조사 삭제", notes = "파라미터로 전달 받은 UUID에 해당하는 설문조사를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "사용자 인증 실패"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음")
    })
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
