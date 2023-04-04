package com.thesurvey.api.dto.request;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.Email;
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
public class UserLoginRequestDto {

    @Email
    @NotBlank
    @ApiModelProperty(name = "이메일", example = "test@gmail.com")
    private String email;

    @Size(min = 8, max = 25)
    @NotBlank
    @ApiModelProperty(name = "비밀번호", example = "mypassword")
    private String password;

}
