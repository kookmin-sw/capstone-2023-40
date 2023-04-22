package com.thesurvey.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel
public class PageableSwagger {

    @ApiModelProperty(name = "페이지 수", example = "1", notes = "1 부터 시작하며, 유효하지 않은 값은 1으로 설정됩니다.")
    private Integer pageNum;
}
