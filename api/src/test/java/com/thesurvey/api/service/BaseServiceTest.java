package com.thesurvey.api.service;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
import com.thesurvey.api.dto.request.UserLoginRequestDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;

public abstract class BaseServiceTest {

    String globalName = "test name";

    String globalEmail = "test@gmail.com";

    String globalAddress = "test address";

    Role globalRole = Role.valueOf("USER");

    String globalPhoneNumber = "01012345678";

    String globalPassword = "Password123@";

    // Image size: 605 kB;
    String globalProfileImage = "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/hubble_m14_wfc3_1flat_cont_final.jpg";

    UserRegisterRequestDto globalRegisterDto = UserRegisterRequestDto.builder()
        .name(globalName)
        .email(globalEmail)
        .password(globalPassword)
        .phoneNumber(globalPhoneNumber)
        .role(globalRole)
        .profileImage(globalProfileImage)
        .address(globalAddress)
        .build();

    UserLoginRequestDto globalLoginDto = UserLoginRequestDto.builder()
        .email(globalEmail)
        .password(globalPassword)
        .build();

}
