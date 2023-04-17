package com.thesurvey.api.service;

import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.SurveyMapper;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class SurveyServiceTest {

    @Mock
    SurveyRepository surveyRepository;

    @Mock
    SurveyMapper surveyMapper;

    @Mock
    UserRepository userRepository;

    @Mock
    AuthenticationService authenticationService;

    @Mock
    QuestionService questionService;

    @Mock
    ParticipationService participationService;

    @Mock
    ParticipationRepository participationRepository;

    @InjectMocks
    SurveyService surveyService;

    // TODO: survey service test
}
