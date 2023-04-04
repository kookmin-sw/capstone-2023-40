package com.thesurvey.api.dto.request;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
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
    @Size(max = 100)
    @ApiModelProperty(name = "이메일", example = "test@gmail.com")
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+=])\\S{8,25}$")
    @ApiModelProperty(name = "비밀번호", example = "Mypassword123@")
    private String password;

}
