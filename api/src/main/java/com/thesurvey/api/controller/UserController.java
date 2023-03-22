package com.thesurvey.api.controller;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserRegisterRequestDto;
import com.thesurvey.api.dto.UserInfoDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.service.AuthenticationService;
import com.thesurvey.api.service.UserService;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
            UserInfoDto userInfoDto = userService.join(userRegisterRequestDto);
            return ResponseEntity.ok(userInfoDto);
        } catch (Exception e) {
            // FIXME: To global API exception handler, duplicated registration
            throw new ExceptionMapper(ErrorMessage.INTERNAL_ERROR, e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserInfoDto> login(HttpServletRequest request,
        @RequestBody UserRegisterRequestDto userRegisterRequestDto) {
        HttpSession session = request.getSession(true);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
            userRegisterRequestDto.getEmail(), userRegisterRequestDto.getPassword());

        SecurityContext context = SecurityContextHolder.getContext();

        try {
            Authentication result = authenticationService.authenticate(authentication);
            context.setAuthentication(result);
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                context);

            return ResponseEntity.ok(userService.getUserByName(result.getName()));
        } catch (AuthenticationException e) {
            throw new ExceptionMapper(ErrorMessage.UNAUTHORIZED_REQUEST);
        }
    }

    @GetMapping("/mypage")
    public ResponseEntity<UserInfoDto> getUserByName() {
        try {
            if (!isAuthenticated()) {
                throw new ExceptionMapper(ErrorMessage.FAILED_AUTHENTICATION);
            }

            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            return ResponseEntity.ok(userService.getUserByName(userName));
        } catch (AuthenticationException e) {
            throw new ExceptionMapper(ErrorMessage.FAILED_AUTHENTICATION);
        }
    }

    public boolean isAuthenticated() {
        return SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
    }

}