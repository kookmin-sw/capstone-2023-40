package com.thesurvey.api.exception;

import java.text.MessageFormat;

public class BadRequestExceptionMapper extends RuntimeException {

    public BadRequestExceptionMapper(ErrorMessage errorMessage, Object... args) {
        super(MessageFormat.format(errorMessage.getMessage(), args));
    }

}
