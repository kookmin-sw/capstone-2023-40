package com.thesurvey.api.util;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.mapper.NotFoundExceptionMapper;
import com.thesurvey.api.exception.mapper.UnauthorizedRequestExceptionMapper;
import com.thesurvey.api.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class UserUtil {

    public static UserRepository userRepository;

    public UserUtil(UserRepository userRepository) {
        UserUtil.userRepository = userRepository;
    }

    public static User getUserFromAuthentication(Authentication authentication) {
        validateUserAuthentication(authentication);
        return userRepository.findByName(authentication.getName()).orElseThrow(
            () -> new NotFoundExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));
    }

    public static Long getUserIdFromAuthentication(Authentication authentication) {
        validateUserAuthentication(authentication);
        User user = userRepository.findByName(authentication.getName()).orElseThrow(
            () -> new NotFoundExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));
        return user.getUserId();
    }

    public static String getUserNameFromAuthentication(Authentication authentication) {
        validateUserAuthentication(authentication);
        User user = userRepository.findByName(authentication.getName()).orElseThrow(
            () -> new NotFoundExceptionMapper(ErrorMessage.USER_NAME_NOT_FOUND,
                authentication.getName()));
        return user.getName();
    }

    public static void validateUserAuthentication(Authentication authentication) {
        if (authentication != null && !authentication.isAuthenticated()) {
            throw new UnauthorizedRequestExceptionMapper(ErrorMessage.FAILED_AUTHENTICATION);
        }
    }
}
