package com.thesurvey.api.service;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.dto.UserInfoDto;
import com.thesurvey.api.dto.request.UserRegisterRequestDto;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
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

    public AuthenticationService(UserDetailsService userDetailsService,
        UserService userService, UserRepository userRepository, UserMapper userMapper) {
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public Authentication authenticate(Authentication authentication)
        throws AuthenticationException {
        UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getName());

        if (passwordEncoder().matches(authentication.getCredentials().toString(),
            userDetails.getPassword())) {
            return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null,
                userDetails.getAuthorities());
        } else {
            throw new ExceptionMapper(ErrorMessage.INVALID_CREDENTIALS);
        }
    }

    @Transactional
    public UserInfoDto register(UserRegisterRequestDto userRegisterRequestDto) {
        User user = userRepository.save(userMapper.toUser(userRegisterRequestDto));
        return userMapper.toUserInfoDto(user);
    }

    public UserInfoDto login(String email, String password) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);

        try {
            Authentication authenticated = authenticate(authentication);
            SecurityContextHolder.getContext().setAuthentication(authenticated);
            return userService.getUserByName(authenticated.getName());
        } catch (AuthenticationException e) {
            throw new ExceptionMapper(ErrorMessage.UNAUTHORIZED_REQUEST);
        }
    }


    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
