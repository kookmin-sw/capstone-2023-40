package com.thesurvey.api.service;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.repository.SurveyRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;


    public SurveyService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
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
