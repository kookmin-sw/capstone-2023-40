package com.thesurvey.api.dto;

import com.thesurvey.api.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class UserDto {

    public String name;

    public UserDto(User user) {
        this.name = user.getName();
    }

    @Builder
    public User toEntity() {
        return User.builder().name(name).build();
    }
}
