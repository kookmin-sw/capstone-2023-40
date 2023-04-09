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
public class AnsweredQuestionRequestDtoValidTestValidTest {

    @Autowired
    private Validator validator;

    @Test
    public void testCorrectInput() {
        // given
        AnsweredQuestionDto answeredQuestionDto = AnsweredQuestionDto.builder()
            .questionTitle("This is test question title")
            .questionDescription("This is test question description")
            .shortAnswer("This tis test short answer.")
            .longAnswer("This is test long answer")
            .build();

        List<AnsweredQuestionDto> questionList = Arrays.asList(answeredQuestionDto);
        AnsweredQuestionRequestDto answeredQuestionRequestDto = AnsweredQuestionRequestDto.builder()
            .surveyId(UUID.fromString("5eaa47c1-cba3-45da-9533-3528e18563c3"))
            .questionList(questionList)
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionRequestDto>> validateSet = validator.validate(
            answeredQuestionRequestDto);

        // then
        assertEquals(validateSet.size(), 0);
    }

    @Test
    public void testValidateNullInput() {
        // given
        AnsweredQuestionRequestDto answeredQuestionRequestDto = AnsweredQuestionRequestDto.builder()
            .surveyId(null)
            .questionList(null)
            .build();

        // when
        Set<ConstraintViolation<AnsweredQuestionRequestDto>> validateSet = validator.validate(
            answeredQuestionRequestDto);

        // then
        assertEquals(validateSet.size(), 2);
    }

}
