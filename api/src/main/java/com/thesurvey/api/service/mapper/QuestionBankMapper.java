package com.thesurvey.api.service.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.thesurvey.api.dto.response.question.QuestionBankAnswerDto;
import com.thesurvey.api.dto.response.question.QuestionOptionAnswerDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.mapper.NotFoundExceptionMapper;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.request.question.QuestionRequestDto;
import com.thesurvey.api.dto.response.question.QuestionBankResponseDto;
import com.thesurvey.api.dto.response.question.QuestionOptionResponseDto;
import com.thesurvey.api.repository.QuestionOptionRepository;
import com.thesurvey.api.util.StringUtil;

import org.springframework.stereotype.Component;

@Component
public class QuestionBankMapper {

    private final QuestionOptionMapper questionOptionMapper;

    private final QuestionOptionRepository questionOptionRepository;

    public QuestionBankMapper(QuestionOptionMapper questionOptionMapper,
        QuestionOptionRepository questionOptionRepository) {
        this.questionOptionMapper = questionOptionMapper;
        this.questionOptionRepository = questionOptionRepository;
    }

    public QuestionBank toQuestionBank(QuestionRequestDto questionRequestDto) {
        return QuestionBank.builder()
            .title(StringUtil.trim(questionRequestDto.getTitle()))
            .questionType(questionRequestDto.getQuestionType())
            .description(StringUtil.trim(questionRequestDto.getDescription()))
            .build();
    }

    public QuestionBankResponseDto toQuestionBankResponseDto(QuestionBank questionBank) {
        List<QuestionOption> questionOptionList = questionOptionRepository.findAllByQuestionBankId(
            questionBank.getQuestionBankId()).orElseThrow(() -> new NotFoundExceptionMapper(
            ErrorMessage.QUESTION_OPTION_NOT_FOUND));
        List<QuestionOptionResponseDto> questionOptionResponseDtoList = null;
        if (questionOptionList != null && questionOptionList.size() != 0) {
            questionOptionResponseDtoList = questionOptionList
                .stream()
                .map(questionOptionMapper::toQuestionOptionResponseDto)
                .collect(Collectors.toList());
        }

        return QuestionBankResponseDto.builder()
            .questionBankId(questionBank.getQuestionBankId())
            .title(questionBank.getTitle())
            .description(questionBank.getDescription())
            .questionType(questionBank.getQuestionType())
            .questionOptions(questionOptionResponseDtoList)
            .createdDate(questionBank.getCreatedDate())
            .modifiedDate(questionBank.getModifiedDate())
            .build();
    }

    public QuestionBankAnswerDto toQuestionBankAnswerDto(QuestionBank questionBank,
        Integer questionNo, List<String> shortLongAnswerList,
        List<QuestionOptionAnswerDto> questionOptionAnswerDtoList) {
        return QuestionBankAnswerDto.builder()
            .questionBankId(questionBank.getQuestionBankId())
            .questionTitle(questionBank.getTitle())
            .questionDescription(questionBank.getDescription())
            .questionType(questionBank.getQuestionType())
            .questionNo(questionNo)
            .textAnswers(shortLongAnswerList)
            .optionAnswers(questionOptionAnswerDtoList)
            .build();
    }
}
