package com.thesurvey.api.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.QuestionOptionRepository;
import com.thesurvey.api.repository.QuestionRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

//@WebMvcTest(SurveyController.class)
@SpringBootTest
@Transactional
public class SurveyServiceTest {

    @Autowired
    SurveyRepository surveyRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    QuestionBankRepository questionBankRepository;
    @Autowired
    SurveyService surveyService;
    @Autowired
    SurveyMapper surveyMapper;
    @Autowired
    ParticipationRepository participationRepository;
    @Autowired
    QuestionOptionRepository questionOptionRepository;

    String title = "My name is Jin";
    QuestionOption questionOption1 = QuestionOption.builder().option("student").build();
    QuestionOption questionOption2 = QuestionOption.builder().option("professor").build();
    List<QuestionOption> questionOptions = Arrays.asList(questionOption1, questionOption2);
    QuestionOption questionOption3 = QuestionOption.builder().option("soccer").build();
    QuestionOption questionOption4 = QuestionOption.builder().option("game").build();
    List<QuestionOption> questionOptions2 = Arrays.asList(questionOption3, questionOption4);
    QuestionBank questionBank1 = QuestionBank.builder().title("test1").question("what's your job?")
        .type(
            QuestionType.LONG_ANSWER).questionOptions(questionOptions).build();
    QuestionBank questionBank2 = QuestionBank.builder().title("test2").question("what's your hobby?")
        .type(QuestionType.SHORT_ANSWER).questionOptions(questionOptions2).build();
    List<QuestionBank> questionBanks = Arrays.asList(questionBank1, questionBank2);
    SurveyDto surveyDto = SurveyDto.builder().title(title).startedDate(LocalDateTime.now())
        .endedDate(LocalDateTime.now()).questionBank(questionBanks).certificationType(
            CertificationType.GOOGLE).build();

//    @Test
//    void testParticipationSave() {
//        Survey savedSurvey = surveyRepository.save(surveyMapper.toSurvey(surveyDto));
//        Long tmpUserId = 1L;
//        ParticipationId participationId = new ParticipationId(savedSurvey.getSurveyId(), tmpUserId);
//        Participation participation = Participation.builder()
//            .participationId(participationId)
//            .certificationType(surveyDto.getCertificationType())
//            .participateDate(LocalDateTime.now())
//            .submittedDate(LocalDateTime.now())
//            .build();
//
//        Participation savedParticipation = participationRepository.save(participation);
//
//        assertNotNull(savedParticipation);
//        assertEquals(tmpUserId, savedParticipation.getParticipationId().getUserId());
//
//
//
//
//    }

    @Test
    void testCreateSurvey() {
        Survey newSurvey = surveyService.createSurvey(surveyDto);

        Optional<Survey> savedSurvey = surveyRepository.findById(newSurvey.getSurveyId());
        List<Question> savedQuestions = questionRepository.findAll();
        List<QuestionBank> savedQuestionBanks = questionBankRepository.findAll();
        List<QuestionOption> savedQuestionOptions = questionOptionRepository.findAll();
        System.out.println("Question Table:");
        for (Question q : savedQuestions) {
            System.out.println(q.getQuestionNo() + " " + q.getQuestionBank().getQuestion());
        }
        System.out.println("QuestionBank Table:");
        for (QuestionBank qb : savedQuestionBanks) {
            System.out.println(qb.getTitle() + " " + qb.getQuestion());
        }
        System.out.println("QuestionOption Table:");
        for (QuestionOption qo : savedQuestionOptions) {
            System.out.println(qo.getOption() + " " + qo.getQuestionBank().getQuestionBankId());
        }

        assertNotNull(savedSurvey);
        assertEquals(title, savedSurvey.get().getTitle());
    }

//    @Test
//    void getSurveyById() {
//        String title = "My name is Jin";
//        Question question1 = new Question("what's your name?");
//        Question question2 = new Question("what's your id?");
//        List<Question> questions = Arrays.asList(question1, question2);
//        Survey survey = new Survey(title, questions);
//        Survey newSurvey = surveyService.createSurvey(survey);
//        questionService.addQuestion(survey.getQuestions());
//
//        Optional<Survey> targetSurvey = surveyService.getSurveyById(newSurvey.getSurveyId());
//
//        assertEquals(survey.getSurveyId(), targetSurvey.get().getSurveyId());
//        assertEquals(survey.getTitle(), targetSurvey.get().getTitle());
//        assertEquals(survey.getQuestions().get(1).getContent(),
//            targetSurvey.get().getQuestions().get(1).getContent());
//
//
//    }

}
