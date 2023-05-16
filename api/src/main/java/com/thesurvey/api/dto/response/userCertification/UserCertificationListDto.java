package com.thesurvey.api.dto.response.userCertification;

import java.util.List;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserCertificationListDto {

    @Schema(description = "인증 정보 목록입니다.")
    private List<CertificationInfo<CertificationType>> certificationInfoList;

}