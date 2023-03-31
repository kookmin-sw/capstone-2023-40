package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequestDto {

    @NotBlank
    @ApiModelProperty(name = "이름", example = "김진명")
    private String name;

    @Email
    @NotBlank
    @ApiModelProperty(name = "이메일", example = "test@gmail.com")
    private String email;

    @NotBlank
    @ApiModelProperty(name = "비밀번호", example = "mypassword")
    private String password;

    @ApiModelProperty(name = "권한", example = "USER")
    private Role role;

    @NotBlank
    @ApiModelProperty(name = "휴대폰 번호", example = "010-1234-1234")
    private String phoneNumber;

    @ApiModelProperty(name = "주소", example = "대한민국 서울")
    private String address;

    @ApiModelProperty(name = "프로필 이미지", example = "https://avatars.githubusercontent.com/kimjinmyeong")
    private String profileImage;

}
