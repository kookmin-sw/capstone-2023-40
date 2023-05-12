package com.thesurvey.api.dto.response.userCertification;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserCertificationListDto {

    @Schema(description = "카카오 인증 정보입니다.")
    private KakaoCertificationInfoDto kakaoCertificationInfo;

    @Schema(description = "네이버 인증 정보입니다.")
    private NaverCertificationInfoDto naverCertificationInfo;

    @Schema(description = "구글 인증 정보입니다.")
    private GoogleCertificationInfoDto googleCertificationInfo;

    @Schema(description = "웹메일 인증 정보입니다.")
    private WebMailCertificationInfoDto webMailCertificationInfo;

    @Schema(description = "운전면허증 인증 정보입니다.")
    private DriverLicenseCertificationInfoDto driverLicenseCertificationInfo;

    @Schema(description = "신분증 인증 정보입니다.")
    private IdentityCardCertificationInfoDto identityCardCertificationInfo;

}