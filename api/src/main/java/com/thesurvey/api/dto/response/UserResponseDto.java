package com.thesurvey.api.dto.response;

import java.time.LocalDateTime;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDto {

    @Schema(example = "1", description = "사용자 아이디입니다.")
    private Long userId;

    @Schema(example = "test@example.com", description = "사용자 이메일입니다.")
    private String email;

    @Schema(example = "test", description = "사용자 이름입니다.")
    private String name;

    @Schema(example = "01012341234", description = "사용자의 휴대폰 번호입니다.")
    private String phoneNumber;

    @Schema(example = "대한민국 서울", description = "사용자의 주소입니다.")
    private String address;

    @Schema(example = "USER", description = "사용자의 역할입니다.")
    private Role role;

    @Schema(example = "https://images2.alphacoders.com/130/1306410.png", description = "사용자의 프로필 이미지 URL입니다.")
    private String profileImage;

    @Schema(example = "2023-04-22T00:00:00", description = "계정의 생성일입니다.")
    private LocalDateTime createdDate;

    @Schema(example = "2023-04-22T00:00:00", description = "계정의 수정일입니다.")
    private LocalDateTime modifiedDate;

}
