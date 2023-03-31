package com.thesurvey.api.dto.request;

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
public class UserLoginRequestDto {
    @Email
    @NotBlank
    @ApiModelProperty(name = "이메일", example = "test@gmail.com")
    private String email;

    @NotBlank
    @ApiModelProperty(name = "비밀번호", example = "mypassword")
    private String password;

}
