package com.thesurvey.api.controller;

import com.thesurvey.api.dto.UserInfoDto;
import com.thesurvey.api.dto.request.UserUpdateRequestDto;
import com.thesurvey.api.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "사용자")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "사용자 정보 조회", notes = "요청한 사용자의 정보를 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "사용자 인증 실패"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청 오류"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음")
    })
    @GetMapping("/profile")
    public ResponseEntity<UserInfoDto> getUserProfile(Authentication authentication) {
        return ResponseEntity.ok(userService.getUserProfile(authentication));
    }

    @ApiOperation(value = "사용자 정보 수정", notes = "요청한 사용자의 정보를 수정합니다. 아래의 모든 필드를 담아 전송해야 합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "사용자 인증 실패"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음")
    })
    @PutMapping("/profile")
    public ResponseEntity<UserInfoDto> updateUserProfile(Authentication authentication,
        @RequestBody UserUpdateRequestDto userUpdateRequestDto) {
        return ResponseEntity.ok(
            userService.updateUserProfile(authentication, userUpdateRequestDto));
    }

    @ApiOperation(value = "사용자 삭제", notes = "요청한 사용자의 정보를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "요청 성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
        @ApiResponse(code = 401, message = "사용자 인증 실패"),
        @ApiResponse(code = 403, message = "접근 권한 없음"),
        @ApiResponse(code = 404, message = "요청한 리소스 찾을 수 없음")
    })
    @DeleteMapping
    public ResponseEntity<Void> deleteUser(Authentication authentication) {
        userService.deleteUser(authentication);
        return ResponseEntity.ok().build();
    }
}
