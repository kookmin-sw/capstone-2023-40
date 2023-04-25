package com.thesurvey.api.dto.request;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequestDto {

    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+=])\\S{8,25}$")
    @Schema(example = "Mypassword123@", description = "비밀번호는 대소문자 및 숫자, 그리고 특수문자를 최소 하나 이상 포함해야 하며, 8자 이상 25자 이하여야 합니다.")
    private String password;

    @Pattern(regexp = "^01[016-9]\\d{7,8}$")
    @Schema(example = "01012345678", description = "휴대폰 번호는 016~019로 시작해야 하며, '-'(hyphen)이 없는 숫자로 7자 이상 8이하여야 합니다.")
    private String phoneNumber;

    @Size(max = 255)
    @Schema(example = "대한민국 서울", description = "주소는 100자 이하의 문자열이어야 합니다.")
    private String address;

    @Pattern(regexp = "^https?://.*$")
    @Schema(example = "https://images2.alphacoders.com/130/1306410.png", description = "프로필 이미지는 http 혹은 https로 시작하는 URI 형태여야 합니다.")
    private String profileImage;

}
