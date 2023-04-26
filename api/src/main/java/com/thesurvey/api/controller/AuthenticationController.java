package com.thesurvey.api.controller;

import javax.validation.Valid;

import com.thesurvey.api.dto.request.UserLoginRequestDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.dto.response.UserResponseDto;
import com.thesurvey.api.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "인증", description = "Authentication Controller")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Operation(summary = "회원가입", description = "회원가입을 요청합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "요청 성공", useReturnTypeSchema = true),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "500", description = "서버 내부 오류", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(
        @Valid @RequestBody UserRegisterRequestDto userRegisterRequestDto) {
        return ResponseEntity.ok(authenticationService.register(userRegisterRequestDto));
    }

    @Operation(summary = "로그인", description = "로그인을 요청합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "요청 성공", useReturnTypeSchema = true),
        @ApiResponse(responseCode = "401", description = "유효하지 않은 인증정보", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(
        @Valid @RequestBody UserLoginRequestDto userLoginRequestDto) {
        UserResponseDto userResponseDto = authenticationService.login(userLoginRequestDto);
        return ResponseEntity.ok(userResponseDto);
    }
}
