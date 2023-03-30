package com.thesurvey.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDto {

    private Long userId;

    private String email;

    private String name;

    private String phoneNumber;

    private String address;

    private String profileImage;

}
