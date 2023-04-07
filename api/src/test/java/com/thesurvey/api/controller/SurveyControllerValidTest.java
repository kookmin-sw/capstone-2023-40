package com.thesurvey.api.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.request.QuestionOptionRequestDto;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

@WebMvcTest(value = SurveyController.class, useDefaultFilters = false)
@MockBean(JpaMetamodelMappingContext.class)
public class SurveyControllerValidTest extends BaseControllerTest {

    @Autowired
    private Validator validator;

    @Test
    void testCorrectInput() {
        // given
        List<QuestionOptionRequestDto> questionOptions = Stream.of(
                QuestionOptionRequestDto.builder().option("option 1").description("option 1").build(),
                QuestionOptionRequestDto.builder().option("option 2").description("option 2").build(),
                QuestionOptionRequestDto.builder().option("option 3").description("option 3").build())
            .collect(Collectors.toList());

        QuestionRequestDto singleChoiceDto = QuestionRequestDto.builder()
            .title("A format to be saved to QuestionBank")
            .description("Question1's description")
            .questionType(QuestionType.SINGLE_CHOICE)
            .questionNo(1)
            .isRequired(true)
            .questionOptions(questionOptions)
            .build();

        QuestionRequestDto multipleChoiceDto = QuestionRequestDto.builder()
            .title("A format to be saved to QuestionBank")
            .description("Question2's description")
            .questionType(QuestionType.MULTIPLE_CHOICE)
            .questionNo(2)
            .isRequired(true)
            .questionOptions(questionOptions)
            .build();

        QuestionRequestDto shortAnswerDto = QuestionRequestDto.builder()
            .title("A format to be saved to QuestionBank")
            .description("Question3's description")
            .questionType(QuestionType.SHORT_ANSWER)
            .questionNo(3)
            .isRequired(true)
            .build();

        QuestionRequestDto longAnswerDto = QuestionRequestDto.builder()
            .title("A format to be saved to QuestionBank")
            .description("Question4's description")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(4)
            .isRequired(false)
            .build();

        List<QuestionRequestDto> question = Arrays.asList(singleChoiceDto,
            multipleChoiceDto, shortAnswerDto, longAnswerDto);

        SurveyRequestDto testSurveyRequestDto = SurveyRequestDto.builder()
            .title("My name is Jin")
            .description("A test survey for Jin")
            .certificationType(
                Arrays.asList(CertificationType.GOOGLE, CertificationType.DRIVER_LICENSE))
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusHours(1))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusWeeks(1))
            .questions(question)
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            testSurveyRequestDto);

        // then
        assertEquals(validateSet.size(), 0);

    }

    @Test
    void testValidateNullInput() {
        // given
        List<QuestionOptionRequestDto> questionOptions = new ArrayList<>();
        QuestionOptionRequestDto questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option(null)
            .build();
        questionOptions.add(questionOptionRequestDto);

        List<QuestionRequestDto> questions = new ArrayList<>();
        QuestionRequestDto testQuestionRequestDto = QuestionRequestDto.builder()
            .title(null)
            .description(null)
            .questionType(null)
            .questionNo(null)
            .isRequired(null)
            .questionOptions(questionOptions)
            .build();
        questions.add(testQuestionRequestDto);

        SurveyRequestDto testSurveyRequestDto = SurveyRequestDto.builder()
            .title(null)
            .description(null)
            .startedDate(null)
            .endedDate(null)
            .questions(questions)
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            testSurveyRequestDto);

        // then
        assertEquals(validateSet.size(), 10);
    }

    @Test
    void testValidateOverMaxStringLength() {
        StringBuilder maxLengthStringBuilder = new StringBuilder();
        while (maxLengthStringBuilder.length() < 256) {
            maxLengthStringBuilder.append("a");
        }
        String maxLengthString = maxLengthStringBuilder.toString();

        List<QuestionOptionRequestDto> questionOptions = new ArrayList<>();
        QuestionOptionRequestDto questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option(maxLengthString) // value to be validated
            .description(maxLengthString) // value to be validated
            .build();
        questionOptions.add(questionOptionRequestDto);

        List<QuestionRequestDto> questions = new ArrayList<>();
        QuestionRequestDto testQuestionRequestDto = QuestionRequestDto.builder()
            .title(maxLengthString) // value to be validated
            .description(maxLengthString) // value to be validated
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .questionOptions(questionOptions)
            .build();
        questions.add(testQuestionRequestDto);

        SurveyRequestDto testSurveyRequestDto = SurveyRequestDto.builder()
            .title(maxLengthString) // value to be validated
            .description(maxLengthString) // value to be validated
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusHours(1))
            .questions(questions)
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            testSurveyRequestDto);

        // then
        assertEquals(validateSet.size(), 6);
    }

    @Test
    void testValidateNotBlank() {
        List<QuestionOptionRequestDto> questionOptions = new ArrayList<>();
        QuestionOptionRequestDto questionOptionRequestDto = QuestionOptionRequestDto.builder()
            .option("") // value to be validated
            .description("test description")
            .build();
        questionOptions.add(questionOptionRequestDto);

        QuestionRequestDto testQuestionRequestDto = QuestionRequestDto.builder()
            .title("") // value to be validated
            .description("") // value to be validated
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(1)
            .isRequired(true)
            .questionOptions(questionOptions)
            .build();

        SurveyRequestDto testSurveyRequestDto = SurveyRequestDto.builder()
            .title("") // value to be validated
            .description("") // value to be validated
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusHours(1))
            .questions(new ArrayList<>()) // value to be validated
            .build();

        // when
        Set<ConstraintViolation<SurveyRequestDto>> validateSet = validator.validate(
            testSurveyRequestDto);

        Set<ConstraintViolation<QuestionRequestDto>> validateQuestionSet = validator.validate(
            testQuestionRequestDto);

        // then
        assertEquals(validateSet.size(), 3);
        assertEquals(validateQuestionSet.size(), 3);
    }


}
