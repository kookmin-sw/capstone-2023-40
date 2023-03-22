package com.thesurvey.api.exception;

public enum ErrorMessage {
    USER_ID_NOT_FOUND("아이디 {0} 에 해당하는 사용자를 찾을 수 없습니다."),
    USER_NAME_NOT_FOUND("이름 {0} 에 해당하는 사용자를 찾을 수 없습니다."),
    USER_EMAIL_NOT_FOUND("이메일 {0} 에 해당하는 사용자를 찾을 수 없습니다."),
    FAILED_AUTHENTICATION("사용자 인증에 실패했습니다."),
    UNAUTHORIZED_REQUEST("인증되지 않은 요청입니다. 로그인 후 다시 시도해주세요."),
    INVALID_CREDENTIALS("이름 혹은 비밀번호가 정확하지 않습니다."),
    SURVEY_NOT_FOUND("설문조사 정보를 찾을 수 없습니다."),
    INTERNAL_ERROR("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.\n{0}");

    private final String message;

    ErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
