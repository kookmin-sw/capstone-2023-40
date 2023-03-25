package com.thesurvey.api.service;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.QuestionRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final SurveyMapper surveyMapper;
    private final QuestionBankRepository questionBankRepository;
    private final ParticipationRepository participationRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    public SurveyService(SurveyRepository surveyRepository, SurveyMapper surveyMapper,
        QuestionBankRepository questionBankRepository,
        ParticipationRepository participationRepository, UserRepository userRepository,
        QuestionRepository questionRepository) {
        this.surveyRepository = surveyRepository;
        this.surveyMapper = surveyMapper;
        this.questionBankRepository = questionBankRepository;
        this.participationRepository = participationRepository;
        this.userRepository = userRepository;

        this.questionRepository = questionRepository;
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
        // First, save Survey, QuestionBank
        Survey savedSurvey = surveyRepository.save(surveyMapper.toSurvey(surveyDto));
        List<QuestionBank> savedQuestionBank = surveyDto.getQuestionBank();
        // Second, save question
        int questionNo = 0;
        Set<Question> questions = new HashSet<>();
        for (QuestionBank questionBank : savedQuestionBank) {
            // Set QuestionOption's parent entity
            for (QuestionOption questionOption : questionBank.getQuestionOptions()) {
                questionOption.setQuestionBank(questionBank);
            }
            Question question = Question.builder()
                .survey(savedSurvey)
                .questionBank(questionBank)
                .questionNo(++questionNo)
                .description(questionBank.getDescription())
                .build();
            questions.add(question);
        }
        questionBankRepository.saveAll(savedQuestionBank);
        questionRepository.saveAll(questions);

        return savedSurvey;
    }

//    @Transactional
//    public Survey submitSurvey(AnsweredQuestionDto answeredQuestionDto) {
//
//    }

}
