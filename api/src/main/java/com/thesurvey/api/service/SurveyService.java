package com.thesurvey.api.service;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.QuestionOptionRepository;
import com.thesurvey.api.repository.QuestionRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.QuestionBankMapper;
import com.thesurvey.api.service.mapper.QuestionMapper;
import com.thesurvey.api.service.mapper.QuestionOptionMapper;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SurveyService {

    // FIXME: Is this correct...? So strongly coupled
    private final SurveyRepository surveyRepository;
    private final SurveyMapper surveyMapper;
    private final QuestionBankMapper questionBankMapper;
    private final QuestionMapper questionMapper;
    private final QuestionOptionMapper questionOptionMapper;
    private final QuestionBankRepository questionBankRepository;
    private final QuestionOptionRepository questionOptionRepository;
    private final ParticipationRepository participationRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    public SurveyService(SurveyRepository surveyRepository, SurveyMapper surveyMapper,
        QuestionBankMapper questionBankMapper, QuestionMapper questionMapper,
        QuestionOptionMapper questionOptionMapper, QuestionBankRepository questionBankRepository,
        QuestionOptionRepository questionOptionRepository,
        ParticipationRepository participationRepository, UserRepository userRepository,
        QuestionRepository questionRepository) {
        this.surveyRepository = surveyRepository;
        this.surveyMapper = surveyMapper;
        this.questionBankMapper = questionBankMapper;
        this.questionMapper = questionMapper;
        this.questionOptionMapper = questionOptionMapper;
        this.questionBankRepository = questionBankRepository;
        this.questionOptionRepository = questionOptionRepository;
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
        return Optional.ofNullable(surveyRepository.findBySurveyIdWithRelatedQuestionBank(surveyId))
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.SURVEY_NOT_FOUND));
    }

    @Transactional
    public Survey createSurvey(SurveyRequestDto surveyRequestDto) {
        Survey survey = surveyRepository.save(surveyMapper.toSurvey(surveyRequestDto));

        for (QuestionRequestDto questionRequestDto : surveyRequestDto.getQuestions()) {
            QuestionBank questionBank = questionBankRepository.save(
                questionBankMapper.toQuestionBank(questionRequestDto));

            Question question = questionRepository.save(
                questionMapper.toQuestion(questionRequestDto, survey, questionBank));

            final QuestionBank _questionBank = questionBank; // lambda needs final
            List<QuestionOption> options = questionRequestDto.getQuestionOptions()
                .stream()
                .map(optionDto -> questionOptionMapper.toQuestionOption(optionDto, _questionBank))
                .collect(Collectors.toList());

            questionOptionRepository.saveAll(options);
        }
        return survey;
    }

//    @Transactional
//    public Survey submitSurvey(AnsweredQuestionDto answeredQuestionDto) {
//
//    }

}
