package com.thesurvey.api.dto;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.User;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDto {

    public String name;
    public String email;
    public List<AnsweredQuestion> answeredQuestions;
    // Convert Dto to Entity
    public UserDto (User user) {
        this.name = user.getName();
        this.email = user.getEmail();
        this.answeredQuestions = user.getAnsweredQuestions();
    }

    @Builder
    public User toEntity(String name, String email) {
        return User.builder().name(name).email(email).build();
    }
}
