package com.thesurvey.api;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.UserLoginRequestDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.dto.response.UserResponseDto;

public class UserTestFactory {

    public static String globalName = "test name";

    public static String globalEmail = "test@gmail.com";

    public static String globalAddress = "test address";

    public static String globalPhoneNumber = "01012345678";

    public static Role globalRole = Role.USER;

    public static String globalPassword = "Password123@";

    // Image size: 4.2 MB;
    public static String globalProfileImage = "https://images2.alphacoders.com/130/1306410.png";

    public static User globalUser = User.builder()
        .name(globalName)
        .email(globalEmail)
        .password(globalPassword)
        .phoneNumber(globalPhoneNumber)
        .profileImage(globalProfileImage)
        .address(globalAddress)
        .build();

    public static UserResponseDto globalUserResponseDto = UserResponseDto.builder()
        .name(globalName)
        .email(globalEmail)
        .role(globalRole)
        .phoneNumber(globalPhoneNumber)
        .profileImage(globalProfileImage)
        .address(globalAddress)
        .build();

    public static UserRegisterRequestDto globalUserRegisterDto = UserRegisterRequestDto.builder()
        .name(globalName)
        .email(globalEmail)
        .password(globalPassword)
        .phoneNumber(globalPhoneNumber)
        .profileImage(globalProfileImage)
        .address(globalAddress)
        .build();

    public static UserLoginRequestDto globalUserLoginDto = UserLoginRequestDto.builder()
        .email(globalEmail)
        .password(globalPassword)
        .build();

}
