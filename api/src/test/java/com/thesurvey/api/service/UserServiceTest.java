package com.thesurvey.api.service;

import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class UserServiceTest {
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    UserService userService;
    @Autowired
    SurveyService surveyService;
    @Autowired
    UserMapper userMapper;



}
