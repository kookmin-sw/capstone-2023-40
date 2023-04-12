package com.thesurvey.api.exception;

import java.text.MessageFormat;

public class ForbiddenRequestExceptionMapper extends RuntimeException {

    public ForbiddenRequestExceptionMapper(ErrorMessage errorMessage, Object... args) {
        super(MessageFormat.format(errorMessage.getMessage(), args));
    }

}
