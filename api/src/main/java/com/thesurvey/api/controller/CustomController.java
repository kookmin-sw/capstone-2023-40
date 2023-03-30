package com.thesurvey.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@RestController
@RequestMapping("/")
public class CustomController {

    /**
     * Custom controller for redirecting to swagger documentation page.
     */
    @GetMapping("/docs")
    public RedirectView redirect() {
        return new RedirectView("/swagger-ui/", true);
    }
}
