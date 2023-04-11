package com.thesurvey.api.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.thesurvey.api.controller.SurveyController;
import com.thesurvey.api.dto.request.AnsweredQuestionDto;
import com.thesurvey.api.dto.request.AnsweredQuestionRequestDto;
import java.util.Arrays;
import java.util.List;
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
public class AnsweredQuestionRequestDtoValidTest {

    @Autowired
    private Validator validator;

    @Test
    public void testCorrectInput() {
        // given
        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .shortAnswer("This tis test short answer.")
            .longAnswer("This is test long answer")
            .build();

        List<AnsweredQuestionDto> answers = Arrays.asList(answeredQuestionDto);
        AnsweredQuestionRequestDto answeredQuestionRequestDto = AnsweredQuestionRequestDto.builder()
            .surveyId(UUID.fromString("5eaa47c1-cba3-45da-9533-3528e18563c3"))
            .answers(answers)
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionRequestDto>> validateSet = validator.validate(
            answeredQuestionRequestDto);

        // then
        assertEquals(validateSet.size(), 0);
    }

    @Test
    public void testValidateNotNull() {
        // given
        AnsweredQuestionRequestDto answeredQuestionRequestDto = AnsweredQuestionRequestDto.builder()
            .surveyId(null)
            .answers(null)
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionRequestDto>> validateSet = validator.validate(
            answeredQuestionRequestDto);

        // then
        assertEquals(validateSet.size(), 2);
    }

}
