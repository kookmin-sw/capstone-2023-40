package com.thesurvey.api.dto.request;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
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
    @ApiModelProperty(name = "이름", example = "김진명")
    private String name;

    @Email
    @NotBlank
    @Size(max = 100)
    @ApiModelProperty(name = "이메일", example = "test@gmail.com")
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+=])\\S{8,25}$")
    @ApiModelProperty(name = "비밀번호", example = "Mypassword123@")
    private String password;

    @ApiModelProperty(name = "권한", example = "USER")
    private Role role;

    @NotBlank
    @Pattern(regexp = "^01[016-9]\\d{7,8}$")
    @ApiModelProperty(name = "휴대폰 번호", example = "01012341234")
    private String phoneNumber;

    @Size(max = 100)
    @ApiModelProperty(name = "주소", example = "대한민국 서울")
    private String address;

    @Pattern(regexp = "^https?://.*$")
    @ApiModelProperty(name = "프로필 이미지", example = "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/hubble_m14_wfc3_1flat_cont_final.jpg")
    private String profileImage;

}
