package com.thesurvey.api.service.mapper;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserDto;
import com.thesurvey.api.dto.UserInfoDto;
import java.util.Optional;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

// @formatter:off
@Component
public class UserMapper {

    public User toUser(UserDto userDto) {
        return User
            .builder()
            .name(userDto.getName())
            .email(userDto.getEmail())
            .password(userDto.getPassword())
            .role(userDto.getRole())
            .phoneNumber(userDto.getPhoneNumber())
            .address(userDto.getAddress())
            .profileImage(userDto.getProfileImage())
            .build();
    }

    public UserDto toUserDto(User user) {
        return UserDto
            .builder()
            .name(user.getName())
            .email(user.getEmail())
            .role(user.getRole())
            .address(user.getAddress())
            .profileImage(user.getProfileImage())
            .phoneNumber(user.getPhoneNumber())
            .password(user.getPassword())
            .build();
    }

    public Optional<UserInfoDto> toUserInfoDto(Optional<User> user) {
        return user.map(value -> UserInfoDto.builder()
                .userId(value.getUserId())
                .name(value.getName())
                .email(value.getEmail())
                .build());
    }


}
// @formatter:on
