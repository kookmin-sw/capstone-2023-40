package com.thesurvey.api;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.dto.request.AnsweredQuestionDto;
import com.thesurvey.api.dto.request.AnsweredQuestionRequestDto;
import com.thesurvey.api.dto.request.QuestionBankUpdateRequestDto;
import com.thesurvey.api.dto.request.QuestionOptionRequestDto;
import com.thesurvey.api.dto.request.QuestionOptionUpdateRequestDto;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.dto.response.QuestionBankResponseDto;
import com.thesurvey.api.dto.response.QuestionOptionResponseDto;
import com.thesurvey.api.dto.response.SurveyResponseDto;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SurveyTestFactory {

    public static SurveyRequestDto getGlobalSurveyRequestDto() {
        List<QuestionOptionRequestDto> globalQuestionOptions = Stream.of(
                QuestionOptionRequestDto.builder().option("option 1").description("option 1").build(),
                QuestionOptionRequestDto.builder().option("option 2").description("option 2").build(),
                QuestionOptionRequestDto.builder().option("option 3").description("option 3").build())
            .collect(Collectors.toList());

        QuestionRequestDto globalSingleChoiceDto = QuestionRequestDto.builder()
            .title("A format to be saved to QuestionBank1")
            .description("Question1's description")
            .questionType(QuestionType.SINGLE_CHOICE)
            .questionNo(1)
            .isRequired(true)
            .questionOptions(globalQuestionOptions)
            .build();

        QuestionRequestDto globalMultipleChoiceDto = QuestionRequestDto.builder()
            .title("A format to be saved to QuestionBank2")
            .description("Question2's description")
            .questionType(QuestionType.MULTIPLE_CHOICE)
            .questionNo(2)
            .isRequired(true)
            .questionOptions(globalQuestionOptions)
            .build();

        QuestionRequestDto globalShortAnswerDto = QuestionRequestDto.builder()
            .title("A format to be saved to QuestionBank3")
            .description("Question3's description")
            .questionType(QuestionType.SHORT_ANSWER)
            .questionNo(3)
            .isRequired(true)
            .build();

        QuestionRequestDto globalLongAnswerDto = QuestionRequestDto.builder()
            .title("A format to be saved to QuestionBank4")
            .description("Question4's description")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(4)
            .isRequired(false)
            .build();

        List<QuestionRequestDto> globalQuestion = Arrays.asList(globalSingleChoiceDto,
            globalMultipleChoiceDto, globalShortAnswerDto, globalLongAnswerDto);

        SurveyRequestDto globalSurveyRequestDto = SurveyRequestDto.builder()
            .title("My name is Jin")
            .description("A test survey for Jin")
            .certificationType(
                Arrays.asList(CertificationType.GOOGLE, CertificationType.DRIVER_LICENSE))
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusHours(1))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusWeeks(1))
            .questions(globalQuestion)
            .build();

        return globalSurveyRequestDto;
    }

    public static SurveyUpdateRequestDto getSurveyUpdateRequestDto(UUID surveyId) {

        List<QuestionOptionUpdateRequestDto> globalQuestionOptionUpdateDtoList = Stream.of(
                QuestionOptionUpdateRequestDto.builder().optionId(1L).option("option 1")
                    .description("option 1").build(),
                QuestionOptionUpdateRequestDto.builder().optionId(2L).option("option 2")
                    .description("option 2").build(),
                QuestionOptionUpdateRequestDto.builder().optionId(3L).option("option 3")
                    .description("option 3").build())
            .collect(Collectors.toList());

        QuestionBankUpdateRequestDto globalSingleChoiceDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(1L)
            .title("A format to be saved to QuestionBank1")
            .description("Question1's description")
            .questionType(QuestionType.SINGLE_CHOICE)
            .questionOptions(globalQuestionOptionUpdateDtoList)
            .isRequired(true)
            .questionNo(1)
            .build();

        QuestionBankUpdateRequestDto globalMultipleChoiceDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(2L)
            .title("A format to be saved to QuestionBank2")
            .description("Question2's description")
            .questionType(QuestionType.MULTIPLE_CHOICE)
            .questionOptions(globalQuestionOptionUpdateDtoList)
            .isRequired(true)
            .questionNo(2)
            .build();

        QuestionBankUpdateRequestDto globalShortAnswerDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(3L)
            .title("A format to be saved to QuestionBank3")
            .description("Question3's description")
            .questionType(QuestionType.SHORT_ANSWER)
            .isRequired(true)
            .questionNo(3)
            .build();

        QuestionBankUpdateRequestDto globalLongAnswerDto = QuestionBankUpdateRequestDto.builder()
            .questionBankId(4L)
            .title("A format to be saved to QuestionBank4")
            .description("Question4's description")
            .questionType(QuestionType.LONG_ANSWER)
            .isRequired(true)
            .questionNo(4)
            .build();

        List<QuestionBankUpdateRequestDto> globalQuestionUpdateDtoList = Arrays.asList(
            globalSingleChoiceDto,
            globalMultipleChoiceDto, globalShortAnswerDto, globalLongAnswerDto);

        return SurveyUpdateRequestDto.builder()
            .surveyId(surveyId)
            .title("My name is Jin")
            .description("A test survey for Jin")
            .certificationType(
                Arrays.asList(CertificationType.GOOGLE, CertificationType.DRIVER_LICENSE))
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusHours(1))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusWeeks(1))
            .questions(globalQuestionUpdateDtoList)
            .build();
    }

    public static SurveyResponseDto getSurveyResponseDto(String surveyId) {
        List<QuestionOptionResponseDto> globalQuestionOptionUpdateDtoList = Stream.of(
                QuestionOptionResponseDto.builder().questionOptionId(1L).option("Updated option 1")
                    .description("updated option 1").build(),
                QuestionOptionResponseDto.builder().questionOptionId(2L).option("Updated option 2")
                    .description("updated option 2").build(),
                QuestionOptionResponseDto.builder().questionOptionId(3L).option("Updated option 3")
                    .description("updated option 3").build())
            .collect(Collectors.toList());

        QuestionBankResponseDto globalSingleChoiceDto = QuestionBankResponseDto.builder()
            .questionBankId(1L)
            .title("Updated A format to be saved to QuestionBank")
            .description("Updated Question1's description")
            .questionType(QuestionType.SINGLE_CHOICE)
            .questionOptions(globalQuestionOptionUpdateDtoList)
            .build();

        QuestionBankResponseDto globalMultipleChoiceDto = QuestionBankResponseDto.builder()
            .questionBankId(2L)
            .title("Updated A format to be saved to QuestionBank")
            .description("updated Question2's description")
            .questionType(QuestionType.MULTIPLE_CHOICE)
            .questionOptions(globalQuestionOptionUpdateDtoList)
            .build();

        QuestionBankResponseDto globalShortAnswerDto = QuestionBankResponseDto.builder()
            .questionBankId(3L)
            .title("Updated A format to be saved to QuestionBank")
            .description("updated Question3's description")
            .questionType(QuestionType.SHORT_ANSWER)
            .build();

        QuestionBankResponseDto globalLongAnswerDto = QuestionBankResponseDto.builder()
            .questionBankId(4L)
            .title("Updated A format to be saved to QuestionBank")
            .description("Updated Question4's description")
            .questionType(QuestionType.LONG_ANSWER)
            .build();

        List<QuestionBankResponseDto> globalQuestionUpdateDtoList = Arrays.asList(
            globalSingleChoiceDto,
            globalMultipleChoiceDto, globalShortAnswerDto, globalLongAnswerDto);

        return SurveyResponseDto.builder()
            .surveyId(UUID.fromString(surveyId))
            .title("Updated My name is Jin")
            .description("Updated A test survey for Jin")
            .certificationType(
                Arrays.asList(CertificationType.GOOGLE, CertificationType.DRIVER_LICENSE))
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusHours(1))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusWeeks(1))
            .questions(globalQuestionUpdateDtoList)
            .build();
    }

    public static AnsweredQuestionRequestDto getAnsweredQuestionRequestDto(UUID surveyId) {
        AnsweredQuestionDto answeredQuestionSingleChoiceDto = AnsweredQuestionDto.builder()
            .questionBankId(1L)
            .singleChoice(1)
            .build();

        AnsweredQuestionDto answeredQuestionMultipleChoiceDto = AnsweredQuestionDto.builder()
            .questionBankId(2L)
            .multipleChoices(List.of(1, 2, 3))
            .build();

        AnsweredQuestionDto answeredQuestionShortAnswerDto = AnsweredQuestionDto.builder()
            .questionBankId(3L)
            .shortAnswer("Test short answer")
            .build();

        AnsweredQuestionDto answeredQuestionLongAnswerDto = AnsweredQuestionDto.builder()
            .questionBankId(4L)
            .longAnswer("Test Long answer")
            .build();

        List<AnsweredQuestionDto> answers = Arrays.asList(
            answeredQuestionSingleChoiceDto, answeredQuestionMultipleChoiceDto,
            answeredQuestionShortAnswerDto, answeredQuestionLongAnswerDto);

        return AnsweredQuestionRequestDto.builder()
            .surveyId(surveyId)
            .answers(answers)
            .build();
    }

}
