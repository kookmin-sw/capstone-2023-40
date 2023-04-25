package com.thesurvey.api.controller;

import com.thesurvey.api.dto.request.UserUpdateRequestDto;
import com.thesurvey.api.dto.response.UserResponseDto;
import com.thesurvey.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "사용자", description = "User Controller")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "사용자 정보 조회", description = "요청한 사용자의 정보를 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "요청 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "401", description = "사용자 인증 실패", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/profile")
    public ResponseEntity<UserResponseDto> getUserProfile(
        @Parameter(hidden = true) Authentication authentication) {
        return ResponseEntity.ok(userService.getUserProfile(authentication));
    }

    @Operation(summary = "사용자 정보 수정", description = "요청한 사용자의 정보를 수정합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "요청 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "401", description = "사용자 인증 실패", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @PatchMapping("/profile")
    public ResponseEntity<UserResponseDto> updateUserProfile(
        @Parameter(hidden = true) Authentication authentication,
        @RequestBody UserUpdateRequestDto userUpdateRequestDto) {
        return ResponseEntity.ok(
            userService.updateUserProfile(authentication, userUpdateRequestDto));
    }

    @Operation(summary = "사용자 삭제", description = "요청한 사용자의 정보를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "요청 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "401", description = "사용자 인증 실패", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "403", description = "접근 권한 없음", content = @Content(schema = @Schema(hidden = true))),
        @ApiResponse(responseCode = "404", description = "요청한 리소스 찾을 수 없음", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    public ResponseEntity<Void> deleteUser(
        @Parameter(hidden = true) Authentication authentication) {
        userService.deleteUser(authentication);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
