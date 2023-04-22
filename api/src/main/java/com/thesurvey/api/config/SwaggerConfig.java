package com.thesurvey.api.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private final String sessionId = "JSESSIONID";

    @Bean
    public GroupedOpenApi apiGroup() {
        return GroupedOpenApi.builder()
            .group("the survey API")
            .packagesToScan("com.thesurvey.api.controller")
            .build();
    }

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .info(setInfo())
            .addSecurityItem(setSecurityItem())
            .components(setComponents());
    }

    private Info setInfo() {
        return new Info()
            .title("the survey API")
            .description("©copyright 2023 KMU Capstone Team 40")
            .version("1.0");
    }

    private SecurityRequirement setSecurityItem() {
        return new SecurityRequirement().addList(sessionId);
    }

    private Components setComponents() {
        return new Components()
            .addSecuritySchemes(sessionId, setSecurityScheme())
            .addParameters(sessionId, setSessionParams());
    }

    private SecurityScheme setSecurityScheme() {
        return new SecurityScheme()
            .type(SecurityScheme.Type.APIKEY)
            .in(SecurityScheme.In.COOKIE)
            .name(sessionId);
    }

    private Parameter setSessionParams() {
        return new Parameter()
            .in("cookie")
            .name(sessionId)
            .description(sessionId)
            .required(true);
    }
}
