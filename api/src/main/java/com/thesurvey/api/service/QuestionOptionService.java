package com.thesurvey.api.service;

import java.util.List;
import java.util.stream.Collectors;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.request.QuestionOptionUpdateRequestDto;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.NotFoundExceptionMapper;
import com.thesurvey.api.repository.QuestionOptionRepository;
import com.thesurvey.api.service.mapper.QuestionOptionMapper;
import com.thesurvey.api.util.StringUtil;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionOptionService {

    private final QuestionOptionMapper questionOptionMapper;

    private final QuestionOptionRepository questionOptionRepository;


    public QuestionOptionService(QuestionOptionMapper questionOptionMapper,
        QuestionOptionRepository questionOptionRepository) {
        this.questionOptionMapper = questionOptionMapper;
        this.questionOptionRepository = questionOptionRepository;
    }

    @Transactional(readOnly = true)
    public String getOptionByQuestionOptionId(Long questionOptionId) {
        return questionOptionRepository.findOptionByQuestionOptionId(questionOptionId)
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.QUESTION_OPTION_NOT_FOUND));
    }

    @Transactional
    public void createQuestionOption(QuestionRequestDto questionRequestDto,
        QuestionBank questionBank) {
        List<QuestionOption> options = questionRequestDto.getQuestionOptions()
            .stream()
            .map(optionDto -> questionOptionMapper.toQuestionOption(optionDto, questionBank))
            .collect(Collectors.toList());
        questionOptionRepository.saveAll(options);
    }

    @Transactional
    public void updateQuestionOption(Long questionBankId,
        List<QuestionOptionUpdateRequestDto> questionOptionUpdateRequestDtoList) {

        for (QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto : questionOptionUpdateRequestDtoList) {
            QuestionOption questionOption = questionOptionRepository.findByQuestionOptionIdAndQuestionBankId(
                questionOptionUpdateRequestDto.getOptionId(), questionBankId).orElseThrow(
                () -> new NotFoundExceptionMapper(ErrorMessage.QUESTION_OPTION_NOT_FOUND,
                    questionOptionUpdateRequestDto.getOptionId()));

            questionOption.changeOption(
                StringUtil.trim(questionOptionUpdateRequestDto.getOption()));
            questionOption.changeDescription(
                StringUtil.trim(questionOptionUpdateRequestDto.getDescription()));

        }

    }
}
