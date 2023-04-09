package com.thesurvey.api.dto;

import org.junit.jupiter.api.Test;

public interface CommonTestMethod {

    void testCorrectInput();

    void testValidateNullInput();

    void testValidateOverMaxStringLength();

    void testValidateNotBlank();
}
