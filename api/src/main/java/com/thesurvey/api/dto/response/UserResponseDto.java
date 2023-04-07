package com.thesurvey.api.dto.response;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
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

    private Role role;

    private String profileImage;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

}
