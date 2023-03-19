package com.thesurvey.api.dto;

import com.thesurvey.api.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@NoArgsConstructor
public class UserDto {

    public String name;
    public String email;

    public UserDto (User user) {
        this.name = user.getName();
        this.email = user.getEmail();
    }
    @Builder
    public UserDto (String name, String email) {
        this.name = name;
        this.email = email;
    }
    public User toEntity() {
        return User.builder().name(this.getName()).email(this.getEmail()).build();
    }
}
