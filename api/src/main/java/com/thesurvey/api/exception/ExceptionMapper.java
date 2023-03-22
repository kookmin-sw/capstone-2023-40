package com.thesurvey.api.exception;

import java.text.MessageFormat;

public class ExceptionMapper extends RuntimeException {

    public ExceptionMapper(ErrorMessage errorMessage, Object... args) {
        super(MessageFormat.format(errorMessage.getMessage(), args));
    }

}
