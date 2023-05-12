package com.thesurvey.api.dto.response.userCertification;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IdentityCardCertificationInfoDto {

    @Schema(example = "false", description = "신분증 인증 여부입니다.")
    private Boolean isCertificated;

    @Schema(example = "2023-04-22T00:00:00", description = "신분증 인증 만료 날짜입니다.")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime expirationDate;

}
