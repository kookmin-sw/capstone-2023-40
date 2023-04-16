package com.thesurvey.api.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.response.SurveyResponseDto;
import com.thesurvey.api.exception.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

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
