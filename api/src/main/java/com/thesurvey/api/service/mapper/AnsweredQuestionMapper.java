package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.dto.AnsweredQuestionDto;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class AnsweredQuestionMapper {

    public Optional<AnsweredQuestionDto> toAnsweredQuestionDto(
        Optional<AnsweredQuestion> answeredQuestion) {
        return answeredQuestion
            .map(value -> AnsweredQuestionDto.builder()
                .shortAnswer(value.getShortAnswer())
                .longAnswer(value.getLongAnswer())
                .singleChoice(value.getSingleChoice())
                .multipleChoices(value.getMultipleChoices())
                .build());
    }

    public AnsweredQuestion toAnsweredQuestion(AnsweredQuestionDto answeredQuestionDto) {
        return AnsweredQuestion
            .builder()
            .shortAnswer(answeredQuestionDto.getShortAnswer())
            .longAnswer(answeredQuestionDto.getLongAnswer())
            .singleChoice(answeredQuestionDto.getSingleChoice())
            .multipleChoices(answeredQuestionDto.getMultipleChoices())
            .build();
    }

}
