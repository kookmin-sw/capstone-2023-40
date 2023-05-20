package com.thesurvey.api.service;

import java.time.LocalDateTime;
import java.time.ZoneId;

import com.thesurvey.api.domain.PointHistory;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.request.user.UserLoginRequestDto;
import com.thesurvey.api.dto.request.user.UserRegisterRequestDto;
import com.thesurvey.api.dto.response.user.UserResponseDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.mapper.BadRequestExceptionMapper;
import com.thesurvey.api.exception.mapper.UnauthorizedRequestExceptionMapper;
import com.thesurvey.api.repository.PointHistoryRepository;
import com.thesurvey.api.repository.UserRepository;
import com.thesurvey.api.service.mapper.UserMapper;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthenticationService {

    private final UserDetailsService userDetailsService;

    private final UserService userService;

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final PointHistoryRepository pointHistoryRepository;

    public AuthenticationService(UserDetailsService userDetailsService,
        UserService userService, UserRepository userRepository, UserMapper userMapper, PointHistoryRepository pointHistoryRepository) {
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.pointHistoryRepository = pointHistoryRepository;
    }

    public Authentication authenticate(Authentication authentication)
        throws AuthenticationException {
        UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getName());

        checkPassword(authentication.getCredentials().toString(), userDetails.getPassword());

        return new UsernamePasswordAuthenticationToken(userDetails.getUsername(),
            userDetails.getPassword(),
            userDetails.getAuthorities());
    }

    @Transactional
    public UserResponseDto register(UserRegisterRequestDto userRegisterRequestDto) {
        User user = userRepository.save(userMapper.toUser(userRegisterRequestDto));
        pointHistoryRepository.save(
            PointHistory.builder()
                .user(user)
                .point(PointHistory.USER_INITIAL_POINT)
                .transactionDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build()
        );
        return userMapper.toUserResponseDto(user);
    }

    @Transactional(readOnly = true)
    public UserResponseDto login(UserLoginRequestDto userLoginRequestDto) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword());

        try {
            Authentication authenticated = authenticate(authentication);
            SecurityContextHolder.getContext().setAuthentication(authenticated);
            return userService.getUserByName(authenticated.getName());
        } catch (AuthenticationException e) {
            throw new UnauthorizedRequestExceptionMapper(ErrorMessage.UNAUTHORIZED_REQUEST);
        }
    }

    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private void checkPassword(CharSequence rawPassword, String encodedPassword) {
        if (!passwordEncoder().matches(rawPassword, encodedPassword)) {
            throw new BadRequestExceptionMapper(ErrorMessage.INVALID_CREDENTIALS);
        }
    }
}
