package com.thesurvey.api.exception;

public enum ErrorMessage {
    USER_ID_NOT_FOUND("아이디 '{0}'에 해당하는 사용자를 찾을 수 없습니다."),
    USER_NAME_NOT_FOUND("이름 '{0}'에 해당하는 사용자를 찾을 수 없습니다."),
    USER_EMAIL_NOT_FOUND("이메일 '{0}'에 해당하는 사용자를 찾을 수 없습니다."),
    INVALID_CREDENTIALS("이름 혹은 비밀번호가 정확하지 않습니다."),
    SURVEY_NOT_FOUND("설문조사 정보를 찾을 수 없습니다.");

    private final String message;

    ErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
