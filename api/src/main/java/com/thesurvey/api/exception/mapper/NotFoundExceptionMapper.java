package com.thesurvey.api.exception.mapper;

import com.thesurvey.api.exception.ErrorMessage;
import java.text.MessageFormat;

public class NotFoundExceptionMapper extends RuntimeException {

    public NotFoundExceptionMapper(ErrorMessage errorMessage) {
        super(errorMessage.getMessage());
    }

    public NotFoundExceptionMapper(ErrorMessage errorMessage, Object... args) {
        super(MessageFormat.format(errorMessage.getMessage(), args));
    }

}
