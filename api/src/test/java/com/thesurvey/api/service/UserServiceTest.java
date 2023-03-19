package com.thesurvey.api.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.Question;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.AnsweredQuestionDto;
import com.thesurvey.api.dto.SurveyDto;
import com.thesurvey.api.dto.UserDto;
import com.thesurvey.api.repository.UserRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class UserServiceTest {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    @Autowired
    SurveyService surveyService;

    @Test
    void join() {
        String name = "JinMyeong";
        String email = "kjmdkdlel@google.com";
        UserDto userDto = UserDto.builder().name(name).email(email).build();
        User user = userDto.toEntity();

        userService.join(userDto);

        String result = userService.getUserByName(user.getName()).getName();
        assertThat(result).isEqualTo(name);
    }

//    @Test
//    void getAllUsersWithAnsweredQuestions() {
//        // Create test User.
//        String name = "JinMyeong";
//        String email = "kjmdkdlel@google.com";
//        UserDto userDto = new UserDto();
//        User user = userDto.toEntity();
////        // Create test Survey.
////        SurveyDto surveyDto = new SurveyDto();
////        String title = "Test Survey";
////        Question question1 = new Question("what's your name?");
////        Question question2 = new Question("what's your id?");
////        List<Question> questions = Arrays.asList(question1, question2);
////        surveyDto.builder().title(title).questions(questions).build();
////        surveyService.createSurvey(surveyDto);
////        String shortAnswer = "Hello";
////        AnsweredQuestionDto answeredQuestionDto = new AnsweredQuestionDto();
////        AnsweredQuestion answeredQuestion = answeredQuestionDto.toEntity(shortAnswer);
////        List<AnsweredQuestion> answeredQuestions = new ArrayList<>();
////        answeredQuestions.add(answeredQuestion);
////
////
//    }
//
}
