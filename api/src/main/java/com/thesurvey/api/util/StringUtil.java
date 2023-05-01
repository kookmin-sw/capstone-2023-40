package com.thesurvey.api.util;

import com.thesurvey.api.exception.mapper.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ErrorMessage;

public class StringUtil {

    public static String trim(String value) {
        if (value != null) {
            if (value.isBlank()) {
                throw new BadRequestExceptionMapper(ErrorMessage.NO_ONLY_WHITESPACE);
            } else {
                return value.trim();
            }
        }
        return null;
    }
}
