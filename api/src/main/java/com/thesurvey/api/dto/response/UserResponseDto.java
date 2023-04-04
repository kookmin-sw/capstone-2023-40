package com.thesurvey.api.dto.response;

import java.time.LocalDateTime;
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

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

}
