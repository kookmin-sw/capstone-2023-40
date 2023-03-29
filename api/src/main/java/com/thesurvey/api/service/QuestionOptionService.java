package com.thesurvey.api.service;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.request.QuestionOptionUpdateRequestDto;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.QuestionOptionRepository;
import com.thesurvey.api.service.mapper.QuestionOptionMapper;
import java.util.List;
import java.util.stream.Collectors;
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

    @Transactional
    public void createQuestionOption(QuestionRequestDto questionRequestDto,
        QuestionBank questionBank) {
        List<QuestionOption> options = questionRequestDto.getQuestionOptions()
            .stream()
            .map(optionDto -> questionOptionMapper.toQuestionOption(optionDto, questionBank))
            .collect(Collectors.toList());
        questionOptionRepository.saveAll(options);
    }

    public void updateQuestionOption(
        List<QuestionOptionUpdateRequestDto> questionOptionUpdateRequestDtoList) {

        for (QuestionOptionUpdateRequestDto questionOptionUpdateRequestDto : questionOptionUpdateRequestDtoList) {
            QuestionOption questionOption = questionOptionRepository.findByQuestionOptionId(
                questionOptionUpdateRequestDto.getOptionId()).orElseThrow(
                () -> new ExceptionMapper(ErrorMessage.QUESTION_OPTION_NOT_FOUND,
                    questionOptionUpdateRequestDto.getOptionId()));

            if (questionOptionUpdateRequestDto.getOption() != null) {
                questionOption.changeOption(questionOptionUpdateRequestDto.getOption());
            }
            if (questionOptionUpdateRequestDto.getDescription() != null) {
                questionOption.changeDescription(questionOptionUpdateRequestDto.getDescription());
            }

        }

    }
}
