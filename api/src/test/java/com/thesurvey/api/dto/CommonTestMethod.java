package com.thesurvey.api.dto;

public interface CommonTestMethod {

    void testCorrectInput();

    void testValidateNullInput();

    void testValidateOverMaxStringLength();

    void testValidateNotBlank();
}
