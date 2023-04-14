package com.thesurvey.api.exception;

import java.text.MessageFormat;

public class NotFoundExceptionMapper extends RuntimeException {

    public NotFoundExceptionMapper(ErrorMessage errorMessage, Object... args) {
        super(MessageFormat.format(errorMessage.getMessage(), args));
    }

}
