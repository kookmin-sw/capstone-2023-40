package com.thesurvey.api.exception.mapper;

import com.thesurvey.api.exception.ErrorMessage;

import java.text.MessageFormat;

public class UnauthorizedRequestExceptionMapper extends RuntimeException {

    public UnauthorizedRequestExceptionMapper(ErrorMessage errorMessage) {
        super(errorMessage.getMessage());
    }

    public UnauthorizedRequestExceptionMapper(ErrorMessage errorMessage, Object... args) {
        super(MessageFormat.format(errorMessage.getMessage(), args));
    }

}
