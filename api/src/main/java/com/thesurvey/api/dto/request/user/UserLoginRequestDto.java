package com.thesurvey.api.dto.request.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
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
public class UserLoginRequestDto {

    @Email
    @NotBlank
    @Size(max = 100)
    @Schema(example = "test@gmail.com", description = "이메일은 100자 이내여야 합니다.")
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+=])\\S{8,25}$")
    @Schema(example = "Mypassword123@", description = "비밀번호는 대소문자 및 숫자, 그리고 특수문자를 최소 하나 이상 포함해야 하며, 8자 이상 25자 이하여야 합니다.")
    private String password;

}
