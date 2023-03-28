package com.thesurvey.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequestDto {

    private String password;

    private String phoneNumber;

    private String address;

    private String profileImage;

}
