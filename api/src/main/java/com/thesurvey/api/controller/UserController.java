package com.thesurvey.api.controller;

import com.thesurvey.api.dto.UserDto;
import com.thesurvey.api.service.UserService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> join(@RequestBody UserDto userDto) {
        userService.join(userDto);
        return ResponseEntity.ok().body("Success sign up");
    }
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsersWithAnsweredQuestions(){
        return ResponseEntity.ok(userService.getAllUsersWithAnsweredQuestion());
    }


}
