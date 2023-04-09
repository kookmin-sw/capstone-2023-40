package com.thesurvey.api.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.dto.request.QuestionOptionUpdateRequestDto;
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
public class QuestionOptionUpdateRequestDtoValidTest implements CommonTestMethod {

    @Autowired
    private Validator validator;

    @Override
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

    @Override
    @Test
    public void testValidateNullInput() {
        // given
        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(null)
            .option(null)
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionUpdateRequestDto>> validateSet = validator.validate(
            questionOptionUpdateRequestDto);

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

    @Override
    @Test
    public void testValidateNotBlank() {
        // given
        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(1L)
            .option("")
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionUpdateRequestDto>> validateSet = validator.validate(
            questionOptionUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 1);
    }
}