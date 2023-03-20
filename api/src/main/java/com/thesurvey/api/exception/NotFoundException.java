package com.thesurvey.api.exception;

import java.text.MessageFormat;

public class NotFoundException extends RuntimeException {

    public NotFoundException(ErrorMessage errorMessage, Object... args) {
        super(MessageFormat.format(errorMessage.getMessage(), args));
    }

}
