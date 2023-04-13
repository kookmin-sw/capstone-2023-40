package com.thesurvey.api.repository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;
import com.thesurvey.api.UserTestFactory;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.NotFoundExceptionMapper;
import com.thesurvey.api.service.UserService;
import com.thesurvey.api.service.mapper.UserMapper;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Mock
    UserRepository userRepository;

    @Mock
    UserMapper userMapper;

    @InjectMocks
    UserService userService;

    @Test
    public void testGetUserByName() {
        // given
        UserRegisterRequestDto userRegisterRequestDto = UserTestFactory.globalUserRegisterDto;
        User user = UserTestFactory.globalUser;

        // when
        when(userRepository.findByName(userRegisterRequestDto.getName()))
            .thenReturn(Optional.ofNullable(user));

        // then
        User foundUser = userRepository.findByName(userRegisterRequestDto.getName())
            .orElseThrow(() -> new NotFoundExceptionMapper(
                ErrorMessage.USER_NAME_NOT_FOUND, userRegisterRequestDto.getName()));

        assertThat(foundUser.getName()).isEqualTo(userRegisterRequestDto.getName());
    }

    @Test
    public void testGetUserByEmail() {
        // given
        UserRegisterRequestDto userRegisterRequestDto = UserTestFactory.globalUserRegisterDto;
        User user = UserTestFactory.globalUser;

        // when
        when(userRepository.findByEmail(userRegisterRequestDto.getEmail()))
            .thenReturn(Optional.ofNullable(user));

        // then
        User foundUser = userRepository.findByEmail(userRegisterRequestDto.getEmail())
            .orElseThrow(() -> new NotFoundExceptionMapper(
                ErrorMessage.USER_NAME_NOT_FOUND, userRegisterRequestDto.getEmail()));

        assertThat(foundUser.getEmail()).isEqualTo(userRegisterRequestDto.getEmail());
    }


}
