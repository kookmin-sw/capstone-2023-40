package com.thesurvey.api.controller;

import com.thesurvey.api.dto.UserInfoDto;
import com.thesurvey.api.dto.request.UserLoginRequestDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "인증")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @ApiOperation(value = "회원가입", notes = "회원가입을 요청합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음"),
        @ApiResponse(code = 500, message = "서버 내부 오류")
    })
    @PostMapping("/register")
    public ResponseEntity<UserInfoDto> register(
        @ApiParam(value = "UserRegisterRequestDto 객체", required = true)
        @RequestBody UserRegisterRequestDto userRegisterRequestDto) {
        try {
            return ResponseEntity.ok(authenticationService.register(userRegisterRequestDto));
        } catch (Exception e) {
            // FIXME: To global API exception handler, duplicated registration
            throw new ExceptionMapper(ErrorMessage.INTERNAL_ERROR, e.getMessage());
        }
    }

    @ApiOperation(value = "로그인", notes = "로그인을 요청합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "요청 성공"),
        @ApiResponse(code = 401, message = "유효하지 않은 인증정보"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음")
    })
    @PostMapping("/login")
    public ResponseEntity<UserInfoDto> login(
        @ApiParam(value = "UserLoginRequestDto 객체", required = true)
        @RequestBody UserLoginRequestDto userLoginRequestDto) {
        try {
            UserInfoDto userInfoDto = authenticationService.login(userLoginRequestDto);
            return ResponseEntity.ok(userInfoDto);
        } catch (AuthenticationException e) {
            throw new ExceptionMapper(ErrorMessage.UNAUTHORIZED_REQUEST);
        }
    }
}
