package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequestDto {

    private String name;

    private String email;

    private String password;

    private Role role;

    private String phoneNumber;

    private String address;

    private String profileImage;

}
