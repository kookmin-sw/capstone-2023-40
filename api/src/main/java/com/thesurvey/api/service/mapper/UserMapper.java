package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.Role;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserRegisterRequestDto;
import com.thesurvey.api.dto.UserInfoDto;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// @formatter:off
@Component
public class UserMapper {

    public User toUser(UserRegisterRequestDto userRegisterRequestDto) {
        return User
            .builder()
            .name(userRegisterRequestDto.getName())
            .email(userRegisterRequestDto.getEmail())
            .password(passwordEncoder().encode(userRegisterRequestDto.getPassword()))
            .role(userRegisterRequestDto.getRole())
            .phoneNumber(userRegisterRequestDto.getPhoneNumber())
            .address(userRegisterRequestDto.getAddress())
            .profileImage(userRegisterRequestDto.getProfileImage())
            .build();
    }

    public UserRegisterRequestDto toUserRegisterRequestDto(User user) {
        return UserRegisterRequestDto
            .builder()
            .name(user.getName())
            .email(user.getEmail())
            .role(Role.USER)
            .phoneNumber(user.getPhoneNumber())
            .address(user.getAddress())
            .profileImage(user.getProfileImage())
            .password(passwordEncoder().encode(user.getPassword()))
            .build();
    }

    public Optional<UserInfoDto> toUserInfoDto(Optional<User> user) {
        return user.map(value -> UserInfoDto.builder()
                .userId(value.getUserId())
                .name(value.getName())
                .email(value.getEmail())
                .build());
    }

    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
// @formatter:on
