package com.thesurvey.api.service;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.QuestionBankDto;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.mapper.QuestionBankMapper;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final SurveyMapper surveyMapper;
    private final QuestionBankMapper questionBankMapper;
    private final QuestionBankRepository questionBankRepository;

    public SurveyService(SurveyRepository surveyRepository, SurveyMapper surveyMapper,
        QuestionBankMapper questionBankMapper, QuestionBankRepository questionBankRepository) {
        this.surveyRepository = surveyRepository;
        this.surveyMapper = surveyMapper;
        this.questionBankMapper = questionBankMapper;
        this.questionBankRepository = questionBankRepository;
    }

    public List<Optional<SurveyDto>> getAllSurvey() {
        List<Survey> surveyList = surveyRepository.findAll();
        List<Optional<SurveyDto>> surveyDtoList = new ArrayList<>();
        for (Survey survey : surveyList) {
            surveyDtoList.add(surveyMapper.toSurveyDto(Optional.ofNullable(survey)));
        }
        return surveyDtoList;
    }

    public Optional<Survey> getSurveyByIdWithRelatedQuestion(UUID surveyId) {
        return Optional.ofNullable(
                surveyRepository.findBySurveyIdWithRelatedQuestionBank(surveyId)).
            orElseThrow(() -> new ExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));
    }

    @Transactional
    public Survey createSurvey(SurveyDto surveyDto) {
        List<QuestionBank> questionBank = new ArrayList<>();
        for (QuestionBankDto questionBankDto : surveyDto.getQuestionBankDtos()) {
            questionBank.add(questionBankMapper.toQuestionBank(questionBankDto));
        }
        questionBankRepository.saveAll(questionBank);
        return surveyRepository.save(surveyMapper.toSurvey(surveyDto));
    }

//    @Transactional
//    public Survey submitSurvey(AnsweredQuestionDto answeredQuestionDto) {
//
//    }

}
