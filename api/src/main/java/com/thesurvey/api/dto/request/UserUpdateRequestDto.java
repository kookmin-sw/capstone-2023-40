package com.thesurvey.api.dto.request;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequestDto {

    @NotBlank
    @Size(min = 8, max = 25)
    @ApiModelProperty(name = "비밀번호", example = "updatedpassword")
    private String password;

    @NotBlank
    @ApiModelProperty(name = "휴대폰 번호", example = "010-1234-1234")
    private String phoneNumber;

    @ApiModelProperty(name = "주소", example = "대한민국 서울")
    private String address;
    
    @ApiModelProperty(name = "프로필 이미지", example = "https://avatars.githubusercontent.com/kimjinmyeong")
    private String profileImage;

}
