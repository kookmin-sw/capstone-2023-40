package com.thesurvey.api.dto.request.user;

import io.swagger.v3.oas.annotations.media.Schema;

import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserCertificationUpdateRequestDto {

    @NotNull
    @Schema(example = "true", description = "카카오 인증 여부입니다.")
    private Boolean isKakaoCertificated;

    @NotNull
    @Schema(example = "false", description = "네이버 인증 여부입니다.")
    private Boolean isNaverCertificated;

    @NotNull
    @Schema(example = "true", description = "구글 인증 여부입니다.")
    private Boolean isGoogleCertificated;

    @NotNull
    @Schema(example = "true", description = "웹메일 인증 여부입니다.")
    private Boolean isWebMailCertificated;

    @NotNull
    @Schema(example = "false", description = "운전면허 인증 여부입니다.")
    private Boolean isDriverLicenseCertificated;

    @NotNull
    @Schema(example = "false", description = "신분증 인증 여부입니다.")
    private Boolean isIdentityCardCertificated;

}