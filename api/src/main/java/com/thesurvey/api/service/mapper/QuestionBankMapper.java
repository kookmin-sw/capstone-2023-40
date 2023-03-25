//package com.thesurvey.api.service.mapper;
//
//import com.thesurvey.api.domain.QuestionBank;
//import com.thesurvey.api.dto.QuestionBankDto;
//import java.util.Optional;
//import org.springframework.stereotype.Component;
//
//@Component
//public class QuestionBankMapper {
//
//    public QuestionBank toQuestionBank(QuestionBankDto questionBankDto) {
//        return QuestionBank.builder()
//            .title(questionBankDto.getTitle())
//            .question(questionBankDto.getQuestion())
//            .type(questionBankDto.getQuestionType())
//            .description(questionBankDto.getDescription())
//            .questionOptions(questionBankDto.getQuestionOptionDtos())
//            .build();
//    }
//
//    public Optional<QuestionBankDto> toQuestionBankDto(Optional<QuestionBank> questionBank) {
//        return questionBank.map(value -> QuestionBankDto.builder()
//            .title(value.getTitle())
//            .question(value.getQuestion())
//            .questionType(value.getType())
//            .description(value.getDescription())
//            .questionOptionDtos(value.getQuestionOptions())
//            .build());
//    }
//}