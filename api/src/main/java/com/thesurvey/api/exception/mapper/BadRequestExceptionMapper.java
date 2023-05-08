package com.thesurvey.api.exception.mapper;

import com.thesurvey.api.exception.ErrorMessage;

import java.text.MessageFormat;

public class BadRequestExceptionMapper extends RuntimeException {

    public BadRequestExceptionMapper(ErrorMessage errorMessage) {
        super(errorMessage.getMessage());
    }

    public BadRequestExceptionMapper(ErrorMessage errorMessage, String value) {
        super(MessageFormat.format(errorMessage.getMessage(), value));
    }

    public BadRequestExceptionMapper(ErrorMessage errorMessage, String value, int size) {
        super(MessageFormat.format(errorMessage.getMessage(), value, size));
    }
}
