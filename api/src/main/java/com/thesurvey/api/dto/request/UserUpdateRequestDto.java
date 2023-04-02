package com.thesurvey.api.dto.request;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
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
    @Min(value = 8, message = "비밀번호는 최소 8자 이상이어야 합니다.")
    @ApiModelProperty(name = "비밀번호", example = "updatedpassword")
    private String password;

    @NotBlank(message = "휴대폰 번호는 필수 정보입니다.")
    @ApiModelProperty(name = "휴대폰 번호", example = "010-1234-1234")
    private String phoneNumber;

    @ApiModelProperty(name = "주소", example = "대한민국 서울")
    private String address;
    
    @ApiModelProperty(name = "프로필 이미지", example = "https://avatars.githubusercontent.com/kimjinmyeong")
    private String profileImage;

}
