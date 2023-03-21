package com.thesurvey.api.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import com.thesurvey.api.domain.Role;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserDto;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class UserServiceTest {
//
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    @Autowired
    SurveyService surveyService;
    @Autowired
    UserMapper userMapper;
    String name = "JinMyeong";
    String email = "kjmdkdlel@google.com";
    String password = "1234";

    String phoneNumber = "010-1234-1234";
    Role role = Role.USER;
    UserDto userDto = UserDto.builder().name(name).email(email).role(role).phoneNumber(phoneNumber).password(password).build();

    @Test
    void testJoin() {
        User user = userService.join(userDto);
        String result = userService.getUserByName(user.getName()).getName();
        assertThat(result).isEqualTo(name);
    }
//
////    @Test
////    void getAllUsersWithAnsweredQuestions() {
////        // Create test User.
////        String name = "JinMyeong";
////        String email = "kjmdkdlel@google.com";
////        UserDto userDto = new UserDto();
////        User user = userDto.toEntity();
//////        // Create test Survey.
//////        SurveyDto surveyDto = new SurveyDto();
//////        String title = "Test Survey";
//////        Question question1 = new Question("what's your name?");
//////        Question question2 = new Question("what's your id?");
//////        List<Question> questions = Arrays.asList(question1, question2);
//////        surveyDto.builder().title(title).questions(questions).build();
//////        surveyService.createSurvey(surveyDto);
//////        String shortAnswer = "Hello";
//////        AnsweredQuestionDto answeredQuestionDto = new AnsweredQuestionDto();
//////        AnsweredQuestion answeredQuestion = answeredQuestionDto.toEntity(shortAnswer);
//////        List<AnsweredQuestion> answeredQuestions = new ArrayList<>();
//////        answeredQuestions.add(answeredQuestion);
//////
//////
////    }
////
}
