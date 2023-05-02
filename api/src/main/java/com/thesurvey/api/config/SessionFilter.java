package com.thesurvey.api.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.mapper.UnauthorizedRequestExceptionMapper;
import com.thesurvey.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class SessionFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        if (SecurityContextHolder.getContext().getAuthentication() == null
            && request.getCookies() != null) {
            Optional<Cookie> jSessionIdCookie = getJSessionIdCookie(request);

            if (jSessionIdCookie.isEmpty()) {
                authenticateUser(request, response);
            }
        }
        filterChain.doFilter(request, response);
    }

    private Optional<Cookie> getJSessionIdCookie(HttpServletRequest request) {
        return Arrays.stream(request.getCookies())
            .filter(cookie -> cookie.getName().equals("JSESSIONID")).findFirst();
    }

    private void authenticateUser(HttpServletRequest request, HttpServletResponse response) {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        if (email == null || password == null) {
            throw new UnauthorizedRequestExceptionMapper(ErrorMessage.FAILED_AUTHENTICATION);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            userDetails, password, userDetails.getAuthorities());

        try {
            Authentication authentication = authenticationManager().authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            getJSessionIdCookie(request)
                .ifPresent(jSessionIdCookie -> {
                    jSessionIdCookie.setValue(request.getSession().getId());
                    response.addCookie(jSessionIdCookie);
                });

        } catch (AuthenticationException e) {
            throw new UnauthorizedRequestExceptionMapper(ErrorMessage.FAILED_AUTHENTICATION);
        }
    }

    private AuthenticationManager authenticationManager() {
        return authentication -> {
            String email = authentication.getName();
            String password = authentication.getCredentials().toString();
            User user = userRepository.findByEmail(email)
                .orElseThrow(
                    () -> new UnauthorizedRequestExceptionMapper(ErrorMessage.USER_EMAIL_NOT_FOUND,
                        email));

            if (!user.getPassword().equals(password)) {
                throw new UnauthorizedRequestExceptionMapper(ErrorMessage.INVALID_CREDENTIALS);
            }

            return new UsernamePasswordAuthenticationToken(email, password,
                List.of(new SimpleGrantedAuthority(user.getRole().name()))
            );
        };
    }

}
