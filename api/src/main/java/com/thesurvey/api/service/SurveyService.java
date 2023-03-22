package com.thesurvey.api.service;

import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.QuestionBankDto;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.QuestionOptionRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.mapper.QuestionBankMapper;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final QuestionBankRepository questionBankRepository;
    private final QuestionOptionRepository questionOptionRepository;
    private final SurveyMapper surveyMapper;
    private final QuestionBankMapper questionBankMapper;


    public SurveyService(SurveyRepository surveyRepository,
        QuestionBankRepository questionBankRepository,
        QuestionOptionRepository questionOptionRepository, SurveyMapper surveyMapper,
        QuestionBankMapper questionBankMapper) {
        this.surveyRepository = surveyRepository;
        this.questionBankRepository = questionBankRepository;
        this.questionOptionRepository = questionOptionRepository;
        this.surveyMapper = surveyMapper;
        this.questionBankMapper = questionBankMapper;
    }

    public List<Survey> getAllSurvey() {
        return surveyRepository.findAll();
    }

    public Optional<Survey> getSurveyByIdWithRelatedQuestion(UUID surveyId) {
        return Optional.ofNullable(
                surveyRepository.findBySurveyIdWithRelatedQuestionBank(surveyId)).
            orElseThrow(() -> new EntityNotFoundException("Survey not found"));
    }
//
//    @Transactional
//    public Survey createSurvey(SurveyDto surveyDto) {
//        List<QuestionBankDto> questionBankDtos = surveyDto.getQuestionBankDtos();
//        for (QuestionBankDto questionBankDto : questionBankDtos) {
//            questionBankRepository.save(questionBankMapper.toQuestionBank(questionBankDto));
//        }
//        for (QuestionBank questionbank : ) {
//            questionOptionRepository.saveAll(questionbank.getQuestionOptions());
//        }
//        return surveyRepository.save(surveyMapper.toSurvey(surveyDto));
//    }

//    @Transactional
//    public Survey submitSurvey(AnsweredQuestionDto answeredQuestionDto) {
//
//    }

}
