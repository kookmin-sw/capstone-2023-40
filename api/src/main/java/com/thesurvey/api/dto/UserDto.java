package com.thesurvey.api.dto;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.Role;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String name;

    private String email;

    private String password;

    private Role role;

    private List<AnsweredQuestion> answeredQuestions;

    private List<Participation> participations;

}
