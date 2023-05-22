package com.thesurvey.api.controller;

import java.util.UUID;

import javax.validation.Valid;

import com.thesurvey.api.dto.request.user.UserCertificationUpdateRequestDto;
import com.thesurvey.api.dto.request.user.UserUpdateRequestDto;
import com.thesurvey.api.dto.response.user.UserResponseDto;
import com.thesurvey.api.dto.response.user.UserSurveyResultDto;
import com.thesurvey.api.dto.response.user.UserSurveyTitleListDto;
import com.thesurvey.api.dto.response.userCertification.UserCertificationListDto;
import com.thesurvey.api.service.SurveyService;
import com.thesurvey.api.service.UserCertificationService;
import com.thesurvey.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "사용자", description = "User Controller")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    private final UserCertificationService userCertificationService;

    private final SurveyService surveyService;

    public UserController(UserService userService,
        UserCertificationService userCertificationService, SurveyService surveyService) {
        this.userService = userService;
        this.userCertificationService = userCertificationService;
        this.surveyService = surveyService;
    }

    @Operation(summary = "사용자 정보 조회", description = "요청한 사용자의 정보를 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "요청 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "401", description = "사용자 인증 실패", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/profile")
    public ResponseEntity<UserResponseDto> getUserProfile(
        @Parameter(hidden = true) Authentication authentication) {
        return ResponseEntity.ok(userService.getUserProfile(authentication));
    }

    @Operation(summary = "사용자 설문조사 목록 조회", description = "사용자가 생성한 설문조사 목록을 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "요청 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "401", description = "사용자 인증 실패", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/surveys")
    public ResponseEntity<UserSurveyTitleListDto> getUserCreatedSurveys(
        @Parameter(hidden = true) Authentication authentication) {
        return ResponseEntity.ok(surveyService.getUserCreatedSurveys(authentication));
    }

    @Operation(summary = "사용자 설문조사 결과 조회", description = "사용자가 생성한 설문조사 결과를 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "요청 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "401", description = "사용자 인증 실패", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/surveys/{surveyId}")
    public ResponseEntity<UserSurveyResultDto> getUserCreatedSurveyResult(
        @Parameter(hidden = true) Authentication authentication,
        @PathVariable("surveyId") UUID surveyId) {
        return ResponseEntity.ok(
            surveyService.getUserCreatedSurveyResult(authentication, surveyId));
    }

    @Operation(summary = "사용자 정보 수정", description = "요청한 사용자의 정보를 수정합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "요청 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "401", description = "사용자 인증 실패", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @PatchMapping("/profile")
    public ResponseEntity<UserResponseDto> updateUserProfile(
        @Parameter(hidden = true) Authentication authentication,
        @RequestBody UserUpdateRequestDto userUpdateRequestDto) {
        return ResponseEntity.ok(
            userService.updateUserProfile(authentication, userUpdateRequestDto));
    }

    @Operation(summary = "사용자 인증 정보 조회", description = "사용자의 인증 정보를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "요청 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "401", description = "사용자 인증 실패", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/profile/certifications")
    public ResponseEntity<UserCertificationListDto> getUserCertification(
        @Parameter(hidden = true) Authentication authentication) {
        return ResponseEntity.ok(
            userCertificationService.getUserCertifications(authentication));
    }

    @Operation(summary = "사용자 인증 정보 수정", description = "사용자의 인증 정보를 수정합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "요청 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "401", description = "사용자 인증 실패", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @PatchMapping("/profile/certifications")
    public ResponseEntity<UserCertificationListDto> updateUserCertification(
        @Parameter(hidden = true) Authentication authentication,
        @RequestBody @Valid UserCertificationUpdateRequestDto userCertificationUpdateRequestDto) {
        return ResponseEntity.ok(
            userCertificationService.updateUserCertification(authentication, userCertificationUpdateRequestDto));
    }

    @Operation(summary = "사용자 삭제", description = "요청한 사용자의 정보를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "요청 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "401", description = "사용자 인증 실패", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    public ResponseEntity<Void> deleteUser(
        @Parameter(hidden = true) Authentication authentication) {
        userService.deleteUser(authentication);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}