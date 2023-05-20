package com.thesurvey.api.util;

import java.util.List;
import java.util.UUID;

import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.mapper.BadRequestExceptionMapper;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.service.PointHistoryService;

import org.springframework.stereotype.Component;

import static com.thesurvey.api.domain.EnumTypeEntity.PointTransactionType.LONG_ANSWER_CONSUME;
import static com.thesurvey.api.domain.EnumTypeEntity.PointTransactionType.LONG_ANSWER_REWARD;
import static com.thesurvey.api.domain.EnumTypeEntity.PointTransactionType.MULTIPLE_CHOICES_CONSUME;
import static com.thesurvey.api.domain.EnumTypeEntity.PointTransactionType.MULTIPLE_CHOICES_REWARD;
import static com.thesurvey.api.domain.EnumTypeEntity.PointTransactionType.SHORT_ANSWER_CONSUME;
import static com.thesurvey.api.domain.EnumTypeEntity.PointTransactionType.SHORT_ANSWER_REWARD;
import static com.thesurvey.api.domain.EnumTypeEntity.PointTransactionType.SINGLE_CHOICE_CONSUME;
import static com.thesurvey.api.domain.EnumTypeEntity.PointTransactionType.SINGLE_CHOICE_REWARD;

@Component
public class PointUtil {

    private final QuestionBankRepository questionBankRepository;

    private final PointHistoryService pointHistoryService;

    public PointUtil(QuestionBankRepository questionBankRepository, PointHistoryService pointHistoryService) {
        this.questionBankRepository = questionBankRepository;
        this.pointHistoryService = pointHistoryService;
    }

    public int calculateSurveyCreatePoints(UUID surveyId) {
        List<QuestionBank> questionBankList = questionBankRepository.findAllBySurveyId(surveyId);
        int createPoints = 0;
        for (QuestionBank questionBank : questionBankList) {
            switch (questionBank.getQuestionType()) {
                case SINGLE_CHOICE:
                    createPoints += SINGLE_CHOICE_CONSUME.getTransactionPoint();
                    break;

                case MULTIPLE_CHOICES:
                    createPoints += MULTIPLE_CHOICES_CONSUME.getTransactionPoint();
                    break;

                case SHORT_ANSWER:
                    createPoints += SHORT_ANSWER_CONSUME.getTransactionPoint();
                    break;

                case LONG_ANSWER:
                    createPoints += LONG_ANSWER_CONSUME.getTransactionPoint();
                    break;

                default:
                    throw new BadRequestExceptionMapper(ErrorMessage.INVALID_QUESTION_TYPE);
            }
        }
        return createPoints;
    }

    public int calculateSurveyMaxRewardPoints(QuestionType questionType) {
        switch (questionType) {
            case SINGLE_CHOICE:
                return SINGLE_CHOICE_REWARD.getTransactionPoint();

            case MULTIPLE_CHOICES:
                return MULTIPLE_CHOICES_REWARD.getTransactionPoint();

            case SHORT_ANSWER:
                return SHORT_ANSWER_REWARD.getTransactionPoint();

            case LONG_ANSWER:
                return LONG_ANSWER_REWARD.getTransactionPoint();

            default:
                throw new BadRequestExceptionMapper(ErrorMessage.INVALID_QUESTION_TYPE);
        }
    }

    public int getSurveyMaxRewardPoints(UUID surveyId) {
        List<QuestionBank> questionBankList = questionBankRepository.findAllBySurveyId(surveyId);
        int maxRewardPoints = questionBankList.stream()
            .mapToInt(questionBank -> calculateSurveyMaxRewardPoints(questionBank.getQuestionType()))
            .sum();
        return maxRewardPoints;
    }

    public void validateUserPoint(int surveyCreatePoint, Long userId) {
        int userTotalPoint = pointHistoryService.getUserTotalPoint(userId);
        if (userTotalPoint - surveyCreatePoint < 0) {
            throw new BadRequestExceptionMapper(ErrorMessage.SURVEY_CREATE_POINT_NOT_ENOUGH);
        }
    }

}
