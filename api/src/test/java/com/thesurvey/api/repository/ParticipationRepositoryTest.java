package com.thesurvey.api.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ParticipationRepositoryTest {

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    ParticipationRepository participationRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    void testFindAllBySurveyId() {
        // given
        Survey testSurvey = Survey.builder()
            .title("test survey")
            .build();
        Survey savedSurvey = surveyRepository.save(testSurvey);

        User testUser = User.builder()
            .name("test user")
            .password("test")
            .email("test@test.com")
            .phoneNumber("01001001000")
            .build();
        userRepository.save(testUser);

        Participation testParticipation1 = Participation.builder()
            .survey(testSurvey)
            .user(testUser)
            .certificationType(CertificationType.GOOGLE)
            .participateDate(LocalDateTime.now())
            .submittedDate(LocalDateTime.now())
            .build();

        Participation testParticipation2 = Participation.builder()
            .survey(testSurvey)
            .user(testUser)
            .certificationType(CertificationType.DRIVER_LICENSE)
            .participateDate(LocalDateTime.now())
            .submittedDate(LocalDateTime.now())
            .build();
        participationRepository.saveAll(Arrays.asList(testParticipation1, testParticipation2));

        // when
        List<Participation> resultList = participationRepository.findAllBySurveyId(savedSurvey.getSurveyId());

        // then
        assertEquals(resultList.size(), 2);

    }

    @Test
    void testExistsByUserIdAndSurveyId() {
        // given
        Survey testSurvey = Survey.builder()
            .title("test survey")
            .build();
        Survey savedSurvey = surveyRepository.save(testSurvey);

        User testUser = User.builder()
            .name("test user")
            .password("test")
            .email("test@test.com")
            .phoneNumber("01001001000")
            .build();
        User savedUser = userRepository.save(testUser);

        Participation testParticipation = Participation.builder()
            .survey(testSurvey)
            .user(testUser)
            .certificationType(CertificationType.GOOGLE)
            .participateDate(LocalDateTime.now())
            .submittedDate(LocalDateTime.now())
            .build();
        participationRepository.save(testParticipation);

        // when
        boolean resultBoolean = participationRepository.existsByUserIdAndSurveyId(
            savedUser.getUserId(), savedSurvey.getSurveyId());

        // then
        assertTrue(resultBoolean);
    }

}
