package com.thesurvey.api.dto.response;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDto {

    @Schema(example = "1", description = "사용자 아이디")
    private Long userId;

    @Schema(example = "test@example.com", description = "이메일")
    private String email;

    @Schema(example = "test", description = "이름")
    private String name;

    @Schema(example = "01012341234", description = "휴대폰 번호")
    private String phoneNumber;

    @Schema(example = "대한민국 서울", description = "주소")
    private String address;

    @Schema(example = "USER", description = "사용자 역할")
    private Role role;

    @Schema(example = "https://images2.alphacoders.com/130/1306410.png", description = "프로필 이미지 URL")
    private String profileImage;

    @Schema(example = "2030-12-01T00:00:00", description = "계정 생성일")
    private LocalDateTime createdDate;

    @Schema(example = "2030-12-12T00:00:00", description = "계정 수정일")
    private LocalDateTime modifiedDate;

}
