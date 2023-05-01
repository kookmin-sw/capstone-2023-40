package com.thesurvey.api.dto.answeredQuestion;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.dto.request.answeredQuestion.AnsweredQuestionDto;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

import static org.junit.jupiter.api.Assertions.assertEquals;

@WebMvcTest(value = SurveyController.class, useDefaultFilters = false)
@MockBean(JpaMetamodelMappingContext.class)
public class AnsweredQuestionDtoValidTest {

    @Autowired
    private Validator validator;

    @Test
    public void testCorrectInput() {
        // given
        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .shortAnswer("This is test short answer.")
            .longAnswer("This is test long answer")
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionDto>> validateSet = validator.validate(
            answeredQuestionDto);

        // then
        assertEquals(validateSet.size(), 0);
    }

    @Test
    public void testValidateOverMaxStringLength() {
        // given
        StringBuilder maxLengthStringBuilder = new StringBuilder();
        while (maxLengthStringBuilder.length() < 256) {
            maxLengthStringBuilder.append("Test String.....");
        }

        String maxLengthString = maxLengthStringBuilder.toString();

        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .shortAnswer(maxLengthString) // violated by @Size
            .longAnswer(maxLengthString) // violated by @Size
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionDto>> validateSet = validator.validate(
            answeredQuestionDto);

        // then
        assertEquals(validateSet.size(), 2); // violated total 2 constraints

    }

}
