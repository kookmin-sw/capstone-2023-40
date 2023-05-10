package com.thesurvey.api.service;

import com.thesurvey.api.exception.mapper.NotFoundExceptionMapper;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.request.question.QuestionBankUpdateRequestDto;
import com.thesurvey.api.dto.request.question.QuestionRequestDto;
import com.thesurvey.api.dto.request.survey.SurveyRequestDto;
import com.thesurvey.api.dto.response.question.QuestionBankResponseDto;
import com.thesurvey.api.exception.mapper.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.QuestionRepository;
import com.thesurvey.api.service.mapper.QuestionBankMapper;
import com.thesurvey.api.service.mapper.QuestionMapper;
import com.thesurvey.api.util.StringUtil;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionService {

    private final QuestionBankRepository questionBankRepository;

    private final QuestionBankMapper questionBankMapper;

    private final QuestionRepository questionRepository;

    private final QuestionMapper questionMapper;

    private final QuestionOptionService questionOptionService;

    public QuestionService(QuestionBankRepository questionBankRepository,
        QuestionBankMapper questionBankMapper, QuestionRepository questionRepository,
        QuestionMapper questionMapper,
        QuestionOptionService questionOptionService) {
        this.questionBankRepository = questionBankRepository;
        this.questionBankMapper = questionBankMapper;
        this.questionRepository = questionRepository;
        this.questionMapper = questionMapper;
        this.questionOptionService = questionOptionService;
    }

    @Transactional(readOnly = true)
    public List<QuestionBank> getAllQuestionBankBySurveyId(UUID surveyId) {
        return questionBankRepository.findAllBySurveyId(surveyId).orElseThrow(
            () -> new NotFoundExceptionMapper(ErrorMessage.QUESTION_NOT_FOUND)
        );
    }

    @Transactional(readOnly = true)
    public List<QuestionBankResponseDto> getQuestionBankInfoDtoListBySurveyId(UUID surveyId) {
        List<QuestionBank> questionBankList = questionBankRepository.findAllBySurveyId(surveyId).orElseThrow(
            () -> new NotFoundExceptionMapper(ErrorMessage.QUESTION_NOT_FOUND)
        );
        return questionBankList
            .stream()
            .map(questionBankMapper::toQuestionBankResponseDto)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Integer getQuestionNoByQuestionBankId(Long questionBankId) {
        return questionRepository.findQuestionNoByQuestionBankId(questionBankId).orElseThrow(
            () -> new NotFoundExceptionMapper(ErrorMessage.QUESTION_NOT_FOUND)
        );
    }

    @Transactional
    public void createQuestion(SurveyRequestDto surveyRequestDto, Survey survey) {
        for (QuestionRequestDto questionRequestDto : surveyRequestDto.getQuestions()) {
            QuestionBank questionBank = questionBankRepository.save(
                questionBankMapper.toQuestionBank(questionRequestDto));

            questionRepository.save(
                questionMapper.toQuestion(questionRequestDto, survey, questionBank));

            if (questionRequestDto.getQuestionOptions() != null) {
                questionOptionService.createQuestionOption(questionRequestDto, questionBank);
            }
        }
    }

    @Transactional
    public void updateQuestion(UUID surveyId,
        List<QuestionBankUpdateRequestDto> questionBankUpdateRequestDtoList) {
        for (QuestionBankUpdateRequestDto questionBankUpdateRequestDto : questionBankUpdateRequestDtoList) {
            QuestionBank questionBank = questionBankRepository.findByQuestionBankId(
                    questionBankUpdateRequestDto.getQuestionBankId())
                .orElseThrow(
                    () -> new BadRequestExceptionMapper(ErrorMessage.QUESTION_BANK_NOT_FOUND));

            // check if the question is included in the survey.
            if (questionRepository.notExistsBySurveyIdAndQuestionBankId(surveyId,
                questionBank.getQuestionBankId())) {
                throw new BadRequestExceptionMapper(ErrorMessage.NOT_SURVEY_QUESTION);
            }

            questionBank.changeTitle(StringUtil.trim(questionBankUpdateRequestDto.getTitle()));
            questionBank.changeDescription(
                StringUtil.trim(questionBankUpdateRequestDto.getDescription()));

            if (questionBankUpdateRequestDto.getQuestionType() != null) {
                questionBank.changeQuestionType(questionBankUpdateRequestDto.getQuestionType());
            }

            Question question = questionRepository.findByQuestionBankId(
                questionBank.getQuestionBankId()).orElseThrow(() -> new BadRequestExceptionMapper(
                ErrorMessage.QUESTION_NOT_FOUND));

            if (questionBankUpdateRequestDto.getIsRequired() != null) {
                question.changeIsRequired(questionBankUpdateRequestDto.getIsRequired());
            }
            if (questionBankUpdateRequestDto.getQuestionNo() != null) {
                question.changeQuestionNo(questionBankUpdateRequestDto.getQuestionNo());
            }
            if (questionBankUpdateRequestDto.getQuestionOptions() != null) {
                questionOptionService.updateQuestionOption(questionBank.getQuestionBankId(),
                    questionBankUpdateRequestDto.getQuestionOptions());
            }
        }
    }

    @Transactional
    public void deleteQuestion(UUID surveyId) {
        Optional<List<Question>> questionList = questionRepository.findAllBySurveyId(surveyId);
        questionRepository.deleteAll(questionList.orElseThrow(
            () -> new NotFoundExceptionMapper(ErrorMessage.QUESTION_NOT_FOUND)));
    }

}