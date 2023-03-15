package com.thesurvey.api.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserDto;
import com.thesurvey.api.repository.UserRepository;
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

    @Test
    void join() {
        String name = "JinMyeong";
        String email = "kjmdkdlel@google.com";

        User user = User.builder().name(name).email(email).build();
        userService.join(user);

        String result = userService.findByName(user.getName()).getName();
        assertThat(result).isEqualTo(name);
    }
}
