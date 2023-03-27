package com.thesurvey.api.controller;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.dto.UserInfoDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.service.AuthenticationService;
import com.thesurvey.api.service.UserService;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/users")
public class UserController {

    private final UserService userService;

    private final AuthenticationService authenticationService;

    public UserController(UserService userService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    @GetMapping
    public ResponseEntity<Optional<List<User>>> getAllUsersWithAnsweredQuestions() {
        return ResponseEntity.ok(userService.getAllUsersWithAnsweredQuestions());
    }

    @PostMapping("/register")
    public ResponseEntity<UserInfoDto> register(
        @RequestBody UserRegisterRequestDto userRegisterRequestDto) {
        try {
            return ResponseEntity.ok(userService.join(userRegisterRequestDto));
        } catch (Exception e) {
            // FIXME: To global API exception handler, duplicated registration
            throw new ExceptionMapper(ErrorMessage.INTERNAL_ERROR, e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserInfoDto> login(@RequestBody UserRegisterRequestDto userRequestDto) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            userRequestDto.getEmail(), userRequestDto.getPassword());

        try {
            Authentication authenticated = authenticationService.authenticate(authentication);
            SecurityContextHolder.getContext().setAuthentication(authenticated);
            return ResponseEntity.ok(userService.getUserByName(authenticated.getName()));
        } catch (AuthenticationException e) {
            throw new ExceptionMapper(ErrorMessage.UNAUTHORIZED_REQUEST);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<UserInfoDto> getUserProfile() {
        // FIXME: not working as expected
        if (!isAuthenticated()) {
            throw new ExceptionMapper(ErrorMessage.FAILED_AUTHENTICATION);
        }

        return ResponseEntity.ok(userService.getUserByName(
            SecurityContextHolder.getContext().getAuthentication().getName()));
    }

    public boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated();
    }

}
