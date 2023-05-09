package com.thesurvey.api.dto.survey;

import com.thesurvey.api.dto.CommonTestMethod;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.request.question.QuestionRequestDto;
import com.thesurvey.api.dto.request.survey.SurveyRequestDto;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

import static org.junit.jupiter.api.Assertions.assertEquals;

@WebMvcTest(value = SurveyController.class, useDefaultFilters = false)
@MockBean(JpaMetamodelMappingContext.class)
public class SurveyRequestDtoValidTest implements CommonTestMethod {

    @Autowired
    private Validator validator;

    @Override
    @Test
    public void testCorrectInput() {
        // given
        QuestionRequestDto questionRequestDto = QuestionRequestDto.builder()
            .title("This is test QuestionRequestDto")
            .description("This is test QuestionRequestDto")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .build();

        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title("This is test title.")
            .description("This is test description")
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().plusHours(1))
            .questions(Arrays.asList(questionRequestDto))
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            surveyRequestDto);

        // then
        assertEquals(validateSet.size(), 0);
    }

    @Override
    @Test
    public void testValidateNotNull() {
        // given
        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title(null) // violated by @NotBlank
            .description(null) // violated by @NotBlank
            .startedDate(null) // violated by @NotNull
            .endedDate(null) // violated by @NotNull
            .questions(null) // violated by @NotEmpty
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            surveyRequestDto);

        // then
        assertEquals(validateSet.size(), 5); // violated total 5 constraints
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

        QuestionRequestDto questionRequestDto = QuestionRequestDto.builder()
            .title("This is test QuestionRequestDto")
            .description("This is test QuestionRequestDto")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .build();

        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title(maxLengthString) // violated by @Size
            .description(maxLengthString) // violated by @Size
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().plusHours(1))
            .questions(Arrays.asList(questionRequestDto))
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            surveyRequestDto);

        // then
        assertEquals(validateSet.size(), 2); // violated total 2 constraints
    }

    @Override
    @Test
    public void testValidateNotBlank() {
        // given
        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title(" ") // violated by @NotBlank
            .description(" ") // violated by @NotBlank
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().plusHours(1))
            .questions(new ArrayList<>()) // violated by @NotEmpty
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            surveyRequestDto);

        // then
        assertEquals(validateSet.size(), 3); // violated total 3 constraints
    }

    @Override
    @Test
    public void testValidateNotEmpty() {
        // given
        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title("") // violated by @NotBlank
            .description("") // violated by @NotBlank
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().plusHours(1))
            .questions(new ArrayList<>()) // violated by @NotEmpty
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            surveyRequestDto);

        // then
        assertEquals(validateSet.size(), 3); // violated total 3 constraints
    }

}
