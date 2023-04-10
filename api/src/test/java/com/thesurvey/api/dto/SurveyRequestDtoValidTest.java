package com.thesurvey.api.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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
public class SurveyRequestDtoValidTest implements CommonTestMethod{

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
        List<QuestionRequestDto> questions = Arrays.asList(questionRequestDto);
        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title("This is test title.")
            .description("This is test description")
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().plusHours(1))
            .questions(questions)
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            surveyRequestDto);

        // then
        assertEquals(validateSet.size(), 0);
    }

    @Override
    @Test
    public void testValidateNullInput() {
        // given
        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title(null)
            .description(null)
            .startedDate(null)
            .endedDate(null)
            .questions(null) // validate both @NotNull and @NotEmpty
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            surveyRequestDto);

        // then
        assertEquals(validateSet.size(), 6);

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
        List<QuestionRequestDto> questions = Arrays.asList(questionRequestDto);
        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title(maxLengthString)
            .description(maxLengthString)
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().plusHours(1))
            .questions(questions)
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            surveyRequestDto);

        // then
        assertEquals(validateSet.size(), 2);
    }

    @Override
    @Test
    public void testValidateNotBlank() {
        List<QuestionRequestDto> emptyQuestions = new ArrayList<>();
        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title("")
            .description("")
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().plusHours(1))
            .questions(emptyQuestions) // validate @NotEmpty
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            surveyRequestDto);

        // then
        assertEquals(validateSet.size(), 3);
    }

    @Test
    public void testValidateTime() {
        // given
        QuestionRequestDto questionRequestDto = QuestionRequestDto.builder()
            .title("This is test QuestionRequestDto")
            .description("This is test QuestionRequestDto")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .build();
        List<QuestionRequestDto> questions = Arrays.asList(questionRequestDto);
        SurveyRequestDto surveyRequestDto = SurveyRequestDto.builder()
            .title("This is test title.")
            .description("This is test description.")
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().minusHours(1))
            .questions(questions)
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            surveyRequestDto);

        // then
        assertEquals(validateSet.size(), 1);
    }


}
