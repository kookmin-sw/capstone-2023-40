package com.thesurvey.api.service;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.SurveyUpdateRequestDto;
import com.thesurvey.api.dto.response.UserResponseDto;
import com.thesurvey.api.dto.request.UserUpdateRequestDto;
import com.thesurvey.api.exception.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.NotFoundExceptionMapper;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.UserMapper;
import com.thesurvey.api.util.StringUtil;
import com.thesurvey.api.util.UserUtil;
import java.time.LocalDateTime;
import java.time.ZoneId;
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
    public UserResponseDto getUserByName(String name) {
        User user = userRepository.findByName(name)
            .orElseThrow(() -> new NotFoundExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND, name));
        return userMapper.toUserResponseDto(user);
    }

    @Transactional(readOnly = true)
    public UserResponseDto getUserProfile(Authentication authentication) {
        return userMapper.toUserResponseDto(UserUtil.getUserFromAuthentication(authentication));
    }

    @Transactional
    public UserResponseDto updateUserProfile(Authentication authentication,
        UserUpdateRequestDto userUpdateRequestDto) {
        User user = UserUtil.getUserFromAuthentication(authentication);

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
            user.changeAddress(StringUtil.trim(userUpdateRequestDto.getAddress()));
        }

        return userMapper.toUserResponseDto(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Authentication authentication) {
        userRepository.delete(UserUtil.getUserFromAuthentication(authentication));
    }

}
