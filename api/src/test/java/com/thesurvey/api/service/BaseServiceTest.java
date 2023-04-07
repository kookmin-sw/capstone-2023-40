package com.thesurvey.api.service;

import com.thesurvey.api.dto.request.UserLoginRequestDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;

public abstract class BaseServiceTest {

    String globalName = "test name";

    String globalEmail = "test@gmail.com";

    String globalAddress = "test address";

    String globalPhoneNumber = "01012345678";

    String globalPassword = "Password123@";

    // Image size: 4.2 MB;
    String globalProfileImage = "https://images2.alphacoders.com/130/1306410.png";

    UserRegisterRequestDto globalRegisterDto = UserRegisterRequestDto.builder()
        .name(globalName)
        .email(globalEmail)
        .password(globalPassword)
        .phoneNumber(globalPhoneNumber)
        .profileImage(globalProfileImage)
        .address(globalAddress)
        .build();

    UserLoginRequestDto globalLoginDto = UserLoginRequestDto.builder()
        .email(globalEmail)
        .password(globalPassword)
        .build();

}
