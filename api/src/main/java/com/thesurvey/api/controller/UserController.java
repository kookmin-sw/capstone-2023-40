package com.thesurvey.api.controller;

import com.thesurvey.api.dto.UserInfoDto;
import com.thesurvey.api.dto.request.UserUpdateRequestDto;
import com.thesurvey.api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserInfoDto> getUserProfile(Authentication authentication) {
        return ResponseEntity.ok(userService.getUserProfile(authentication));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserInfoDto> updateUserProfile(Authentication authentication,
        @RequestBody UserUpdateRequestDto userUpdateRequestDto) {
        return ResponseEntity.ok(
            userService.updateUserProfile(authentication, userUpdateRequestDto));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUser(Authentication authentication) {
        userService.deleteUser(authentication);
        return ResponseEntity.ok().build();
    }

}
