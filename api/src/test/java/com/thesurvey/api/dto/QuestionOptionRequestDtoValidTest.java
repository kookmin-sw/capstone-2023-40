package com.thesurvey.api.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.dto.request.QuestionOptionRequestDto;
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
public class QuestionOptionRequestDtoValidTest implements CommonTestMethod {

    @Autowired
    private Validator validator;

    @Override
    @Test
    public void testCorrectInput() {
        // given
        QuestionOptionRequestDto questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option("This is test option")
            .description("This is test description")
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionRequestDto>> validateSet = validator.validate(
            questionOptionRequestDto);

        // then
        assertEquals(validateSet.size(), 0);
    }

    @Override
    @Test
    public void testValidateNotNull() {
        // given
        QuestionOptionRequestDto questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option(null)
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionRequestDto>> validateSet = validator.validate(
            questionOptionRequestDto);

        // then
        assertEquals(validateSet.size(), 1);
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
        QuestionOptionRequestDto questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option(maxLengthString)
            .description(maxLengthString)
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionRequestDto>> validateSet = validator.validate(
            questionOptionRequestDto);

        // then
        assertEquals(validateSet.size(), 2);
    }

    @Override
    @Test
    public void testValidateNotBlank() {
        // given
        QuestionOptionRequestDto questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option(" ") // violated by @NotBlank
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionRequestDto>> validateSet = validator.validate(
            questionOptionRequestDto);

        // then
        assertEquals(validateSet.size(), 1); // violated total 1 constraint
    }

    @Override
    @Test
    public void testValidateNotEmpty() {
        // given
        QuestionOptionRequestDto questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option("") // violated by @NotBlank
            .build();

        // when
        Set<ConstraintViolation<QuestionOptionRequestDto>> validateSet = validator.validate(
            questionOptionRequestDto);

        // then
        assertEquals(validateSet.size(), 1); // violated total 1 constraint
    }
}
