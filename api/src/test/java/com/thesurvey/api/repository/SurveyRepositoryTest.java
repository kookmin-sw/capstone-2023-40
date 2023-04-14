package com.thesurvey.api.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SurveyRepositoryTest {

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    ParticipationRepository participationRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    void testFindAllInDescendingOrder() {
        // given
        Survey oldSurvey = Survey.builder()
            .title("Old survey title")
            .build();

        Survey latestSurvey = Survey.builder()
            .title("Latest survey title")
            .build();

        // when
        surveyRepository.save(oldSurvey);
        surveyRepository.save(latestSurvey);
        List<Survey> resultList = surveyRepository.findAllInDescendingOrder();
        // then
        assertEquals(resultList.get(0).getTitle(), latestSurvey.getTitle());

    }

    @Test
    void testFindCertificationTypeBySurveyId() {
        // given
        Survey testSurvey = Survey.builder()
            .title("test survey title")
            .build();

        User testUser = User.builder()
            .name("test user")
            .email("test email")
            .password("test password")
            .phoneNumber("010-0000-0000")
            .build();

        Participation testParticipation = Participation.builder()
            .user(testUser)
            .survey(testSurvey)
            .participateDate(LocalDateTime.now())
            .submittedDate(LocalDateTime.now())
            .certificationType(CertificationType.GOOGLE)
            .build();

        Survey savedSurvey = surveyRepository.save(testSurvey);
        userRepository.save(testUser);
        participationRepository.save(testParticipation);

        // when
        List<Integer> resultTypeList = surveyRepository.findCertificationTypeBySurveyId(
            savedSurvey.getSurveyId());

        // then
        assertEquals(resultTypeList.get(0), 2); // Certification.GOOGLE convert to 2 in db.

    }

    @Test
    void testFindBySurveyId() {
        // given
        Survey testSurvey = Survey.builder()
            .title("test survey title")
            .build();

        // when
        Survey savedSurvey = surveyRepository.save(testSurvey);

        //then
        Optional<Survey> resultSurvey = surveyRepository.findBySurveyId(savedSurvey.getSurveyId());
        assertEquals(resultSurvey.get().getTitle(), testSurvey.getTitle());
    }
}
