package com.thesurvey.api.service;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserInfoDto;
import com.thesurvey.api.dto.request.UserUpdateRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.UserMapper;
import org.springframework.security.core.Authentication;
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

    @Transactional(readOnly = true)
    public UserInfoDto getUserByName(String name) {
        return userMapper.toUserInfoDto(userRepository.findByName(name))
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND, name));
    }

    @Transactional(readOnly = true)
    public UserInfoDto getUserByEmail(String email) {
        return userMapper.toUserInfoDto(userRepository.findByEmail(email))
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.USER_EMAIL_NOT_FOUND, email));
    }

    @Transactional(readOnly = true)
    public UserInfoDto getUserProfile(Authentication authentication) {
        return userMapper.toUserInfoDto(userRepository.findByName(authentication.getName()))
            .orElseThrow(() -> new ExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));
    }

    @Transactional
    public UserInfoDto updateUserProfile(Authentication authentication,
        UserUpdateRequestDto userUpdateRequestDto) {
        User user = getUserFromAuthentication(authentication);

        if (userUpdateRequestDto.getPassword() != null) {
            user.changePassword(userUpdateRequestDto.getPassword());
        }

        if (userUpdateRequestDto.getPhoneNumber() != null) {
            user.changePhoneNumber(userUpdateRequestDto.getPhoneNumber());
        }

        if (userUpdateRequestDto.getProfileImage() != null) {
            user.changeProfileImage(userUpdateRequestDto.getProfileImage());
        }

        if (userUpdateRequestDto.getAddress() != null) {
            user.changeAddress(userUpdateRequestDto.getAddress());
        }

        return userMapper.toUserInfoDto(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Authentication authentication) {
        userRepository.delete(getUserFromAuthentication(authentication));
    }

    private User getUserFromAuthentication(Authentication authentication) {
        return userRepository.findByName(authentication.getName()).orElseThrow(
            () -> new ExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND, authentication.getName()));
    }

}
