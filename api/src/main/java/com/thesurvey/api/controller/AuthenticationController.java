package com.thesurvey.api.controller;

import com.thesurvey.api.dto.UserInfoDto;
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

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserInfoDto> register(
        @RequestBody UserRegisterRequestDto userRegisterRequestDto) {
        try {
            return ResponseEntity.ok(authenticationService.register(userRegisterRequestDto));
        } catch (Exception e) {
            // FIXME: To global API exception handler, duplicated registration
            throw new ExceptionMapper(ErrorMessage.INTERNAL_ERROR, e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserInfoDto> login(@RequestBody UserRegisterRequestDto userRequestDto) {
        try {
            UserInfoDto userInfoDto = authenticationService.login(userRequestDto.getEmail(),
                userRequestDto.getPassword());
            return ResponseEntity.ok(userInfoDto);
        } catch (AuthenticationException e) {
            throw new ExceptionMapper(ErrorMessage.UNAUTHORIZED_REQUEST);
        }
    }
}
