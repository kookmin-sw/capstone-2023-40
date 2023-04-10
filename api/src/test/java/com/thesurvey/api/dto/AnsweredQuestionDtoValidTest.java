package com.thesurvey.api.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.dto.request.AnsweredQuestionDto;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

@WebMvcTest(value = SurveyController.class, useDefaultFilters = false)
@MockBean(JpaMetamodelMappingContext.class)
public class AnsweredQuestionDtoValidTest implements CommonTestMethod {

    @Autowired
    private Validator validator;

    @Override
    @Test
    public void testCorrectInput() {
        // given
        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .questionTitle("This is test question title")
            .questionDescription("This is test question description")
            .shortAnswer("This tis test short answer.")
            .longAnswer("This is test long answer")
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionDto>> validateSet = validator.validate(
            answeredQuestionDto);

        // then
        assertEquals(validateSet.size(), 0);
    }

    @Override
    @Test
    public void testValidateNotNull() {
        // given
        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .questionTitle(null)
            .questionDescription(null)
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionDto>> validateSet = validator.validate(
            answeredQuestionDto);

        // then
        assertEquals(validateSet.size(), 2);
    }

    @Override
    @Test
    public void testValidateOverMaxStringLength() {
        // given
        StringBuilder maxLengthStringBuilder = new StringBuilder();
        while (maxLengthStringBuilder.length() < 256) {
            maxLengthStringBuilder.append("Test String.....");
        }

        String maxLengthString = maxLengthStringBuilder.toString();

        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .questionTitle(maxLengthString)
            .questionDescription(maxLengthString)
            .shortAnswer(maxLengthString)
            .longAnswer(maxLengthString)
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionDto>> validateSet = validator.validate(
            answeredQuestionDto);

        // then
        assertEquals(validateSet.size(), 4);

    }

    @Override
    @Test
    public void testValidateNotBlank() {
        // given
        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .questionTitle(" ") // violated by @NotBlank
            .questionDescription(" ") // violated by @NotBlank
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionDto>> validateSet = validator.validate(
            answeredQuestionDto);

        // then
        assertEquals(validateSet.size(), 2); // violated total 2 constraints
    }

    @Override
    @Test
    public void testValidateNotEmpty() {
        // given
        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .questionTitle("") // violated by @NotBlank
            .questionDescription("") // violated by @NotBlank
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionDto>> validateSet = validator.validate(
            answeredQuestionDto);

        // then
        assertEquals(validateSet.size(), 2); // violated total 2 constraints
    }

}
