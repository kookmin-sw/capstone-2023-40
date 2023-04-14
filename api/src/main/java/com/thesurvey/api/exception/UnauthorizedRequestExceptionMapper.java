package com.thesurvey.api.exception;

import java.text.MessageFormat;

public class UnauthorizedRequestExceptionMapper extends RuntimeException {

    public UnauthorizedRequestExceptionMapper(ErrorMessage errorMessage, Object... args) {
        super(MessageFormat.format(errorMessage.getMessage(), args));
    }

}
