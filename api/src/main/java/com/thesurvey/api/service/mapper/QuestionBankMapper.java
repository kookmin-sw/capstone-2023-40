package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.dto.QuestionBankInfoDto;
import com.thesurvey.api.dto.QuestionOptionInfoDto;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import com.thesurvey.api.repository.QuestionOptionRepository;
import java.util.ArrayList;
import java.util.List;
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
            .title(questionRequestDto.getTitle())
            .questionType(questionRequestDto.getQuestionType())
            .description(questionRequestDto.getDescription())
            .build();
    }

    public QuestionBankInfoDto toQuestionBankInfoDto(QuestionBank questionBank) {
        List<QuestionOption> questionOptionList = questionOptionRepository.findByQuestionBankId(
            questionBank.getQuestionBankId());
        List<QuestionOptionInfoDto> questionOptionInfoDtoList = new ArrayList<>();

        for (QuestionOption questionOption : questionOptionList) {
            questionOptionInfoDtoList.add(
                questionOptionMapper.toQuestionOptionInfoDto(questionOption));
        }

        return QuestionBankInfoDto.builder()
            .title(questionBank.getTitle())
            .description(questionBank.getDescription())
            .questionType(questionBank.getQuestionType())
            .questionOptions(questionOptionInfoDtoList)
            .build();
    }

}
