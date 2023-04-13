package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.dto.response.UserResponseDto;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toUser(UserRegisterRequestDto userRegisterRequestDto) {
        String address = userRegisterRequestDto.getAddress() != null ?
            userRegisterRequestDto.getAddress().trim() : null;
        return User
            .builder()
            .name(userRegisterRequestDto.getName())
            .email(userRegisterRequestDto.getEmail())
            .password(passwordEncoder().encode(userRegisterRequestDto.getPassword()))
            .phoneNumber(userRegisterRequestDto.getPhoneNumber())
            .address(address)
            .profileImage(userRegisterRequestDto.getProfileImage())
            .build();
    }

    public UserResponseDto toUserResponseDto(User user) {
        return UserResponseDto.builder()
            .userId(user.getUserId())
            .name(user.getName())
            .email(user.getEmail())
            .address(user.getAddress())
            .role(user.getRole())
            .phoneNumber(user.getPhoneNumber())
            .profileImage(user.getProfileImage())
            .createdDate(user.getCreatedDate())
            .modifiedDate(user.getModifiedDate())
            .build();
    }

    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
