package com.thesurvey.api.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.request.QuestionRequestDto;
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
public class QuestionRequestDtoValidTest implements CommonTestMethod {

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

        // when
        Set<ConstraintViolation<QuestionRequestDto>> validateSet = validator.validate(
            questionRequestDto);

        // then
        assertEquals(validateSet.size(), 0);

    }

    @Override
    public void testValidateNullInput() {
        // given
        QuestionRequestDto questionRequestDto = QuestionRequestDto.builder()
            .title(null)
            .description(null)
            .questionType(null)
            .questionNo(null)
            .isRequired(null)
            .build();

        // when
        Set<ConstraintViolation<QuestionRequestDto>> validateSet = validator.validate(
            questionRequestDto);

        // then
        assertEquals(validateSet.size(), 5);
    }

    @Override
    public void testValidateOverMaxStringLength() {
        // given
        StringBuilder maxLengthStringBuilder = new StringBuilder();
        while (maxLengthStringBuilder.length() < 256) {
            maxLengthStringBuilder.append("Test String.....");
        }
        String maxLengthString = maxLengthStringBuilder.toString();
        QuestionRequestDto questionRequestDto = QuestionRequestDto.builder()
            .title(maxLengthString)
            .description(maxLengthString)
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .build();

        // when
        Set<ConstraintViolation<QuestionRequestDto>> validateSet = validator.validate(
            questionRequestDto);

        // then
        assertEquals(validateSet.size(), 2);
    }

    @Override
    public void testValidateNotBlank() {
        QuestionRequestDto questionRequestDto = QuestionRequestDto.builder()
            .title("")
            .description("")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .build();

        // when
        Set<ConstraintViolation<QuestionRequestDto>> validateSet = validator.validate(
            questionRequestDto);

        // then
        assertEquals(validateSet.size(), 2);
    }
}
