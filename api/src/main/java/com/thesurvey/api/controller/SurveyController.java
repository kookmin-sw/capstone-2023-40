package com.thesurvey.api.controller;

import com.thesurvey.api.dto.response.AnsweredQuestionResponseDto;
import com.thesurvey.api.dto.response.SurveyListPageDto;
import com.thesurvey.api.dto.response.SurveyResponseDto;
import com.thesurvey.api.dto.request.AnsweredQuestionRequestDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.service.AnsweredQuestionService;
import com.thesurvey.api.service.SurveyService;
import java.util.UUID;
import javax.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    private final AnsweredQuestionService answeredQuestionService;

    public SurveyController(SurveyService surveyService,
        AnsweredQuestionService answeredQuestionService) {
        this.surveyService = surveyService;
        this.answeredQuestionService = answeredQuestionService;
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
    public ResponseEntity<Page<SurveyListPageDto>> getAllSurvey(@PageableDefault(page = 0, size = 8) Pageable pageable) {
        return ResponseEntity.ok(surveyService.getAllSurvey(pageable));
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
    public ResponseEntity<SurveyResponseDto> getSurvey(
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
    public ResponseEntity<SurveyResponseDto> createSurvey(Authentication authentication,
        @Valid @RequestBody SurveyRequestDto surveyRequestDto) {
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
    @PatchMapping
    public ResponseEntity<SurveyResponseDto> updateSurvey(Authentication authentication,
        @Valid @RequestBody SurveyUpdateRequestDto surveyUpdateRequestDto) {
        return ResponseEntity.ok(
            surveyService.updateSurvey(authentication, surveyUpdateRequestDto));
    }

    @ApiOperation(value = "설문조사 삭제", notes = "파라미터로 전달 받은 UUID에 해당하는 설문조사를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 204, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "사용자 인증 실패"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음")
    })
    @DeleteMapping("/{surveyId}")
    public ResponseEntity<Void> deleteSurvey(Authentication authentication,
        @PathVariable("surveyId") String surveyId) {
        surveyService.deleteSurvey(authentication, UUID.fromString(surveyId));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @ApiOperation(value = "설문조사 응답 제출", notes = "설문조사 응답을 제출합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 204, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "사용자 인증 실패"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음")
    })
    @PostMapping("/submit")
    public ResponseEntity<AnsweredQuestionResponseDto> submitSurvey(Authentication authentication,
        @Valid @RequestBody AnsweredQuestionRequestDto answeredQuestionRequestDto) {
        answeredQuestionService.createAnswer(authentication, answeredQuestionRequestDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
