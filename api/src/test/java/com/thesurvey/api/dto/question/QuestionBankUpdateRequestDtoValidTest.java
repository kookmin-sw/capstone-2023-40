package com.thesurvey.api.dto.question;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.request.question.QuestionBankUpdateRequestDto;
import com.thesurvey.api.dto.request.question.QuestionOptionUpdateRequestDto;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

import static org.junit.jupiter.api.Assertions.assertEquals;

@WebMvcTest(value = SurveyController.class, useDefaultFilters = false)
@MockBean(JpaMetamodelMappingContext.class)
public class QuestionBankUpdateRequestDtoValidTest {

    @Autowired
    private Validator validator;

    @Test
    public void testCorrectInput() {
        // given
        QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto = QuestionOptionUpdateRequestDto.builder()
            .optionId(1L)
            .option("This is test option")
            .description("This is test option")
            .build();

        List<QuestionOptionUpdateRequestDto> questionOptions = Arrays.asList(
            questionOptionUpdateRequestDto);

        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(1L)
            .title("This is test QuestionBankUpdateRequestDto")
            .description("This is test QuestionBankUpdateRequestDto")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .questionOptions(questionOptions)
            .build();

        // when
        Set<ConstraintViolation<QuestionBankUpdateRequestDto>> validateSet = validator.validate(
            questionBankUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 0);
    }

    @Test
    public void testValidateNotNull() {
        // given
        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(null) // violated by @NotNull
            .build();

        // when
        Set<ConstraintViolation<QuestionBankUpdateRequestDto>> validateSet = validator.validate(
            questionBankUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 1); // violated total 1 constraint

    }

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
            .title(maxLengthString)
            .description(maxLengthString)
            .build();

        // when
        Set<ConstraintViolation<QuestionBankUpdateRequestDto>> validateSet = validator.validate(
            questionBankUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 2);
    }

    @Test
    public void testValidatePositive() {
        // given
        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(1L)
            .questionNo(-1) // violated by @Positive
            .build();

        // when
        Set<ConstraintViolation<QuestionBankUpdateRequestDto>> validateSet = validator.validate(
            questionBankUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 1); // violated total 1 constraint
    }

    @Test
    public void testInvalidId() {
        // given
        QuestionBankUpdateRequestDto questionBankUpdateRequestDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(-1L)
            .build();

        // when
        Set<ConstraintViolation<QuestionBankUpdateRequestDto>> validateSet = validator.validate(
            questionBankUpdateRequestDto);

        // then
        assertEquals(validateSet.size(), 1);
    }
}
