package com.thesurvey.api.dto.answeredQuestion;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.dto.request.answeredQuestion.AnsweredQuestionDto;
import com.thesurvey.api.dto.request.answeredQuestion.AnsweredQuestionRequestDto;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

import static org.junit.jupiter.api.Assertions.assertEquals;

@WebMvcTest(value = SurveyController.class, useDefaultFilters = false)
@MockBean(JpaMetamodelMappingContext.class)
public class AnsweredQuestionRequestDtoValidTest {

    @Autowired
    private Validator validator;

    @Test
    public void testCorrectInput() {
        // given
        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .shortAnswer("This tis test short answer.")
            .longAnswer("This is test long answer")
            .build();

        List<AnsweredQuestionDto> answers = Arrays.asList(answeredQuestionDto);
        AnsweredQuestionRequestDto answeredQuestionRequestDto = AnsweredQuestionRequestDto.builder()
            .surveyId(UUID.randomUUID())
            .answers(answers)
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionRequestDto>> validateSet = validator.validate(
            answeredQuestionRequestDto);

        // then
        assertEquals(validateSet.size(), 0);
    }

    @Test
    public void testValidateNotNull() {
        // given
        AnsweredQuestionRequestDto answeredQuestionRequestDto = AnsweredQuestionRequestDto.builder()
            .surveyId(null)
            .answers(null)
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionRequestDto>> validateSet = validator.validate(
            answeredQuestionRequestDto);

        // then
        assertEquals(validateSet.size(), 2);
    }

}
