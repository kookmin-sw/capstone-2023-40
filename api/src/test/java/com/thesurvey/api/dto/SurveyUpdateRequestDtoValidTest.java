package com.thesurvey.api.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.request.QuestionBankUpdateRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Set;
import java.util.UUID;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

@WebMvcTest(value = SurveyController.class, useDefaultFilters = false)
@MockBean(JpaMetamodelMappingContext.class)
public class SurveyUpdateRequestDtoValidTest implements CommonTestMethod{

    @Autowired
    private Validator validator;

    @Override
    @Test
    public void testCorrectInput() {
        // given
        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(1L)
            .title("This is test QuestionBankUpdateRequestDto")
            .description("This is test QuestionBankUpdateRequestDto")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .build();

        SurveyUpdateRequestDto surveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .surveyId(UUID.fromString("5eaa47c1-cba3-45da-9533-3528e18563c3"))
            .title("This is test title.")
            .description("This is test description")
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().plusDays(1))
            .questions(Arrays.asList(questionBankUpdateRequestDto))
            .build();

        // when
        Set<ConstraintViolation<SurveyUpdateRequestDto>> validateSet = validator.validate(
            surveyUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 0);

    }

    @Override
    @Test
    public void testValidateNullInput() {
        SurveyUpdateRequestDto surveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .surveyId(null)
            .title(null)
            .description(null)
            .startedDate(null)
            .endedDate(null)
            .questions(null) // validate both @NotNull and @NotEmpty
            .build();

        // when
        Set<ConstraintViolation<SurveyUpdateRequestDto>> validateSet = validator.validate(
            surveyUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 7);
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

        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(1L)
            .title("This is test QuestionBankUpdateRequestDto")
            .description("This is test QuestionBankUpdateRequestDto")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .build();

        SurveyUpdateRequestDto surveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .surveyId(UUID.fromString("5eaa47c1-cba3-45da-9533-3528e18563c3"))
            .title(maxLengthString)
            .description(maxLengthString)
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().plusDays(1))
            .questions(Arrays.asList(questionBankUpdateRequestDto))
            .build();

        // when
        Set<ConstraintViolation<SurveyUpdateRequestDto>> validateSet = validator.validate(
            surveyUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 2);
    }

    @Override
    @Test
    public void testValidateNotBlank() {
        // given
        SurveyUpdateRequestDto surveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .surveyId(UUID.fromString("5eaa47c1-cba3-45da-9533-3528e18563c3"))
            .title("")
            .description("")
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().plusDays(1))
            .questions(new ArrayList<>()) // validate @NotBlank
            .build();

        // when
        Set<ConstraintViolation<SurveyUpdateRequestDto>> validateSet = validator.validate(
            surveyUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 3);
    }

    @Test
    public void testValidateTime() {
        // given
        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(1L)
            .title("This is test QuestionBankUpdateRequestDto")
            .description("This is test QuestionBankUpdateRequestDto")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .build();

        SurveyUpdateRequestDto surveyUpdateRequestDto = SurveyUpdateRequestDto.builder()
            .surveyId(UUID.fromString("5eaa47c1-cba3-45da-9533-3528e18563c3"))
            .title("This is test title")
            .description("This is test description")
            .startedDate(LocalDateTime.now())
            .endedDate(LocalDateTime.now().minusDays(1))
            .questions(Arrays.asList(questionBankUpdateRequestDto))
            .build();

        // when
        Set<ConstraintViolation<SurveyUpdateRequestDto>> validateSet = validator.validate(
            surveyUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 1);
    }

}
