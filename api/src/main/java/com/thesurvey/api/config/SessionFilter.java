package com.thesurvey.api.config;

import com.thesurvey.api.domain.User;
import com.thesurvey.api.exception.ErrorMessage;
import com.thesurvey.api.exception.ExceptionMapper;
import com.thesurvey.api.repository.UserRepository;
import java.io.IOException;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Slf4j
@RequiredArgsConstructor
public class SessionFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        if (SecurityContextHolder.getContext().getAuthentication() == null
            && request.getCookies() != null) {
            Optional<Cookie> jSessionIdCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("JSESSIONID")).findFirst();

            if (jSessionIdCookie.isEmpty()) {
                String email = request.getParameter("email");
                String password = request.getParameter("password");

                if (email != null && password != null) {
                    UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, password, userDetails.getAuthorities());

                    try {
                        Authentication authentication = authenticationManager().authenticate(
                            authToken);
                        SecurityContextHolder.getContext().setAuthentication(authentication);

                        jSessionIdCookie.get().setValue(request.getSession().getId());
                        response.addCookie(jSessionIdCookie.get());

                    } catch (AuthenticationException e) {
                        log.error(MessageFormat.format("[ERROR] {0}", e.getMessage()));
                    }
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    private AuthenticationManager authenticationManager() {
        return authentication -> {
            String email = authentication.getName();
            String password = authentication.getCredentials().toString();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ExceptionMapper(ErrorMessage.USER_EMAIL_NOT_FOUND, email));

            if (!user.getPassword().equals(password)) {
                throw new ExceptionMapper(ErrorMessage.INVALID_CREDENTIALS);
            }

            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(user.getRole().name()));

            return new UsernamePasswordAuthenticationToken(email, password, authorities);
        };
    }
}
