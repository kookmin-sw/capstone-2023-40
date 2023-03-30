package com.thesurvey.api.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.EnumTypeEntity.QuestionType;
import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.QuestionBank;
import com.thesurvey.api.domain.QuestionOption;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.QuestionRequestDto;
import com.thesurvey.api.dto.request.SurveyRequestDto;
import com.thesurvey.api.repository.ParticipationRepository;
import com.thesurvey.api.repository.QuestionBankRepository;
import com.thesurvey.api.repository.QuestionOptionRepository;
import com.thesurvey.api.repository.QuestionRepository;
import com.thesurvey.api.repository.SurveyRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.QuestionBankMapper;
import com.thesurvey.api.service.mapper.QuestionMapper;
import com.thesurvey.api.service.mapper.SurveyMapper;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

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
    QuestionMapper questionMapper;
    @Autowired
    QuestionBankMapper questionBankMapper;
    @Autowired
    ParticipationRepository participationRepository;
    @Autowired
    QuestionOptionRepository questionOptionRepository;
    @Autowired
    UserRepository userRepository;

    @Test
    public void testCreateSurvey() {
        SurveyRequestDto surveyRequestDto = SurveyRequestDto
            .builder()
            .title("My name is Jin")
            .description("A test survey for Jin")
            .certificationType(Arrays.asList(CertificationType.GOOGLE, CertificationType.DRIVER_LICENSE))
            .startedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
            .endedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).plusWeeks(1))
            .build();

        QuestionRequestDto singleChoiceDto = QuestionRequestDto
            .builder()
            .title("A format to be saved to QuestionBank")
            .description("Question1's description")
            .questionType(QuestionType.SINGLE_CHOICE)
            .questionNo(1)
            .isRequired(true)
            .build();

        QuestionRequestDto multipleChoiceDto = QuestionRequestDto
            .builder()
            .title("A format to be saved to QuestionBank")
            .description("Question2's description")
            .questionType(QuestionType.MULTIPLE_CHOICE)
            .questionNo(2)
            .isRequired(true)
            .build();

        QuestionRequestDto shortAnswerDto = QuestionRequestDto
            .builder()
            .title("A format to be saved to QuestionBank")
            .description("Question3's description")
            .questionType(QuestionType.SHORT_ANSWER)
            .questionNo(3)
            .isRequired(true)
            .build();

        QuestionRequestDto longAnswerDto = QuestionRequestDto
            .builder()
            .title("A format to be saved to QuestionBank")
            .description("Question4's description")
            .questionType(QuestionType.LONG_ANSWER)
            .questionNo(4)
            .isRequired(false)
            .build();

        Survey survey = surveyRepository.save(surveyMapper.toSurvey(surveyRequestDto));

        QuestionBank singleChoiceQuestionBank = questionBankRepository.save(
            questionBankMapper.toQuestionBank(singleChoiceDto));

        QuestionBank multipleChoiceQuestionBank = questionBankRepository.save(
            questionBankMapper.toQuestionBank(multipleChoiceDto));

        QuestionBank shortAnswerQuestionBank = questionBankRepository.save(
            questionBankMapper.toQuestionBank(shortAnswerDto));

        QuestionBank longAnswerQuestionBank = questionBankRepository.save(
            questionBankMapper.toQuestionBank(longAnswerDto));

        Question singlieChoiceQuestion = questionRepository.save(
            questionMapper.toQuestion(singleChoiceDto, survey, singleChoiceQuestionBank));

        Question multipleChoiceQuestion = questionRepository.save(
            questionMapper.toQuestion(singleChoiceDto, survey, singleChoiceQuestionBank));

        Question shortAnswerQuestion = questionRepository.save(
            questionMapper.toQuestion(singleChoiceDto, survey, singleChoiceQuestionBank));

        Question longAnswerQuestion = questionRepository.save(
            questionMapper.toQuestion(singleChoiceDto, survey, singleChoiceQuestionBank));

        List<QuestionOption> questionOptions = questionOptionRepository.saveAll(Stream.of(
                QuestionOption.builder().option("option 1").description("option 1").build(),
                QuestionOption.builder().option("option 2").description("option 2").build(),
                QuestionOption.builder().option("option 3").description("option 3").build())
            .collect(Collectors.toList()));

        User user = userRepository.save(User.builder()
            .name("jinmyeong_kim")
            .email("jinmyeong@g.com")
            .password("12341234")
            .phoneNumber("010-0000-0000")
            .build());

        for (CertificationType certificationType : surveyRequestDto.getCertificationType()) {
            Participation participation = Participation.builder()
                .user(user)
                .survey(survey)
                .certificationType(certificationType)
                .participateDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .submittedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build();
            Participation participation1 = participationRepository.save(participation);
            System.out.println("############" + participation1.getParticipationId().getCertificationType());
        }
        List<Participation> savedparticipations = participationRepository.findAll();


        assertNotNull(singleChoiceQuestionBank);
        assertNotNull(multipleChoiceQuestionBank);
        assertNotNull(shortAnswerQuestionBank);
        assertNotNull(longAnswerQuestionBank);
        assertNotNull(singlieChoiceQuestion);
        assertNotNull(multipleChoiceQuestion);
        assertNotNull(shortAnswerQuestion);
        assertNotNull(longAnswerQuestion);
        assertNotNull(questionOptions);
        assertEquals(2, savedparticipations.size());
        assertEquals(3, questionOptions.size());
        assertEquals("My name is Jin", survey.getTitle());
    }

}
