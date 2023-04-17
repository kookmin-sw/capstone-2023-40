package com.thesurvey.api.dto.request;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import javax.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequestDto {

    @NotBlank
    @Size(max = 50)
    @ApiModelProperty(name = "이름", example = "test", notes = "이름은 50자 이내여야 합니다.")
    private String name;

    @Email
    @NotBlank
    @Size(max = 100)
    @ApiModelProperty(name = "이메일", example = "test@gmail.com", notes = "이메일은 100자 이내여야 합니다.")
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+=])\\S{8,25}$")
    @ApiModelProperty(name = "비밀번호", example = "Mypassword123@", notes = "비밀번호는 대소문자 및 숫자, 그리고 특수문자를 최소 하나 이상 포함해야 하며, 8자 이상 25자 이하여야 합니다.")
    private String password;

    @NotBlank
    @Pattern(regexp = "^01[016-9]\\d{7,8}$")
    @ApiModelProperty(name = "휴대폰 번호", example = "01012341234", notes = "휴대폰 번호는 016~019로 시작해야 하며, '-'(hyphen)이 없는 숫자로 7자 이상 8이하여야 합니다.")
    private String phoneNumber;

    @Size(max = 100)
    @ApiModelProperty(name = "주소", example = "대한민국 서울", notes = "주소는 100자 이하의 문자열이어야 합니다.")
    private String address;

    @Pattern(regexp = "^https?://.*$")
    @ApiModelProperty(name = "프로필 이미지", example = "https://images2.alphacoders.com/130/1306410.png", notes = "프로필 이미지는 http 혹은 https로 시작하는 URI 형태여야 합니다.")
    private String profileImage;

}
