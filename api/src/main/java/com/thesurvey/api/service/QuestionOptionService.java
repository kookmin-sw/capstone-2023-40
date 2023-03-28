package com.thesurvey.api.service;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.request.QuestionRequestDto;
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
    public void createQuestionOption(QuestionRequestDto questionRequestDto, QuestionBank questionBank) {
        List<QuestionOption> options = questionRequestDto.getQuestionOptions()
            .stream()
            .map(optionDto -> questionOptionMapper.toQuestionOption(optionDto, questionBank))
            .collect(Collectors.toList());
        questionOptionRepository.saveAll(options);
    }
}
