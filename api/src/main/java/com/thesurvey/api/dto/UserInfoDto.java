package com.thesurvey.api.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfoDto {

    private Long userId;

    private String email;

    private String name;

}
