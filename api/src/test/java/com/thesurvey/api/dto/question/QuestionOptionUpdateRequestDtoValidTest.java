package com.thesurvey.api.dto.question;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.dto.request.question.QuestionOptionUpdateRequestDto;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

import static org.junit.jupiter.api.Assertions.assertEquals;

@WebMvcTest(value = SurveyController.class, useDefaultFilters = false)
@MockBean(JpaMetamodelMappingContext.class)
public class QuestionOptionUpdateRequestDtoValidTest {

    @Autowired
    private Validator validator;

    @Test
    public void testCorrectInput() {
        // given
        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(1L)
            .option("This is test option")
            .description("This is test description")
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionUpdateRequestDto>> validateSet = validator.validate(
            questionOptionUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 0);
    }

    @Test
    public void testValidateNotNull() {
        // given
        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(null)
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionUpdateRequestDto>> validateSet = validator.validate(
            questionOptionUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 1);
    }

    @Test
    public void testValidateOverMaxStringLength() {
        // given
        StringBuilder maxLengthStringBuilder = new StringBuilder();
        while (maxLengthStringBuilder.length() < 256) {
            maxLengthStringBuilder.append("Test String.....");
        }
        String maxLengthString = maxLengthStringBuilder.toString();
        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(1L)
            .option(maxLengthString)
            .description(maxLengthString)
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionUpdateRequestDto>> validateSet = validator.validate(
            questionOptionUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 2);
    }

    @Test
    public void testInvalidId() {
        // given
        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(-1L)
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionUpdateRequestDto>> validateSet = validator.validate(
            questionOptionUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 1);
    }

}
