package com.thesurvey.api.controller;

import com.thesurvey.api.domain.User;
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
    public ResponseEntity<User> join(@RequestBody User user) {
        userService.join(user);
        return ResponseEntity.ok(user);
    }
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsersWithAnsweredQuestions(){
        return ResponseEntity.ok(userService.getAllUsersWithAnsweredQuestion());
    }


}
