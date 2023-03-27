package com.thesurvey.api.service;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserInfoDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.UserMapper;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserInfoDto getUserByName(String name) {
        return userMapper.toUserInfoDto(userRepository.findByName(name))
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND, name));
    }

    public UserInfoDto getUserByEmail(String email) {
        return userMapper.toUserInfoDto(userRepository.findByEmail(email))
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.USER_EMAIL_NOT_FOUND, email));
    }

    @Transactional
    public UserInfoDto join(UserRegisterRequestDto userRegisterRequestDto) {
        User user = userRepository.save(userMapper.toUser(userRegisterRequestDto));
        return userMapper.toUserInfoDto(user);
    }

    @Transactional
    public Optional<List<User>> getAllUsersWithAnsweredQuestions() {
        return userRepository.findByAllWithAnsweredQuestion();
    }

}
