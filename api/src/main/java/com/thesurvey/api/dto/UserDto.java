package com.thesurvey.api.dto;

import com.thesurvey.api.domain.AnsweredQuestion;
import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.Role;
import java.util.List;
import javax.persistence.Column;
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

    private String phoneNumber;

    private String address;

    private String profileImage;

}
