package com.thesurvey.api.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;

import com.thesurvey.api.domain.EnumTypeEntity.CertificationType;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.domain.UserCertification;
import com.thesurvey.api.dto.request.user.UserRegisterRequestDto;
import com.thesurvey.api.repository.UserCertificationRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.UserMapper;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
public class UserCertificationServiceTest {

    @Autowired
    UserCertificationService userCertificationService;

    @Autowired
    UserCertificationRepository userCertificationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Test
    void testDeleteExpiredCertificates() {
        // given
        UserRegisterRequestDto userRegisterRequestDto = UserRegisterRequestDto.builder()
            .name("certificationUser")
            .email("userCertification@gmail.com")
            .password("Password40@")
            .phoneNumber("01012345678")
            .build();
        User user = userMapper.toUser(userRegisterRequestDto);
        User savedUser = userRepository.save(user);

        // Create a user certification with an expiration date that is 2 years before the current date;
        LocalDateTime expirationDate = LocalDateTime.now(ZoneId.of("Asia/Seoul")).minusYears(2);
        UserCertification testUserCertification = UserCertification.builder()
            .user(savedUser)
            .certificationDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).minusYears(4))
            .expirationDate(expirationDate)
            .certificationType(CertificationType.KAKAO)
            .build();
        userCertificationRepository.save(testUserCertification);

        // when
        userCertificationRepository.deleteByExpirationDateLessThanEqual(
            LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        // then
        assertEquals(userCertificationRepository.
            findUserCertificationByUserId(savedUser.getUserId()), new ArrayList<>());
    }

}

