package com.thesurvey.api.config;

import java.util.Arrays;
import java.util.Collections;

import javax.servlet.http.HttpServletResponse;

import com.thesurvey.api.exception.AuthenticationEntryPointHandler;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;

    private final SessionFilter sessionFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // @formatter:off
        return http
            .csrf().disable()
            .cors().and()
            .authorizeRequests()
                .antMatchers(
                    "/v2/api-docs/**",
                    "/v3/api-docs/**",
                    "/configuration/**",
                    "/swagger-ui.html",
                    "/swagger-ui/**",
                    "/docs/**"
                ).permitAll()
                .antMatchers("/admin/**").hasAuthority("ADMIN")
                .antMatchers("/surveys/**").authenticated()
                .antMatchers("/users/**").authenticated()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().permitAll()
            .and()
            .exceptionHandling().authenticationEntryPoint(new AuthenticationEntryPointHandler())
            .and()
            .logout()
                .logoutUrl("/auth/logout")
                .permitAll()
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler(logoutSuccessHandler())
            .and()
            .sessionManagement()
                .sessionFixation().changeSessionId()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .sessionConcurrency(configurer -> {
                    configurer.maximumSessions(1);
                    configurer.maxSessionsPreventsLogin(true);
                })
            .and()
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(sessionFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
        // @formatter:on
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration config = new CorsConfiguration();
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        config.setAllowedOriginPatterns(Collections.singletonList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(Arrays.asList("Cache-Control", "Content-Type"));

        source.registerCorsConfiguration("/**", config);
        return source;
    }

    private LogoutSuccessHandler logoutSuccessHandler() {
        return (request, response, authentication) -> {
            response.setStatus(HttpServletResponse.SC_OK);
        };
    }
}
