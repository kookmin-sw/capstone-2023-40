package com.thesurvey.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel
public class CustomPageable {

    @ApiModelProperty(name = "페이지 크기", example = "한 페이지에 포함될 항목의 개수입니다.", notes = "1 부터 시작하며, 유효하지 않은 값은 1로 설정됩니다.")
    private Integer pageSize;

    @ApiModelProperty(name = "페이지 수", example = "가져올 페이지의 번호를 나타냅니다.", notes = "0 부터 시작하며, 유효하지 않은 값은 0으로 설정됩니다.")
    private Integer pageNum;
}
