package com.thesurvey.api.dto.response;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SurveyResponseDto {

    private UUID surveyId;

    private String title;

    private String description;

    private LocalDateTime startedDate;

    private LocalDateTime endedDate;

<<<<<<< HEAD:api/src/main/java/com/thesurvey/api/dto/response/SurveyResponseDto.java
    private List<QuestionBankResponseDto> questions;
=======
    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    private List<QuestionBankInfoDto> questions;
>>>>>>> d0f29fe (feat: add created and modified date):api/src/main/java/com/thesurvey/api/dto/SurveyInfoDto.java

    private List<CertificationType> certificationType;

}
