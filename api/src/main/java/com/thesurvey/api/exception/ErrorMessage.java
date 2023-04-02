package com.thesurvey.api.exception;

public enum ErrorMessage {
    USER_ID_NOT_FOUND("아이디 {0} 에 해당하는 사용자를 찾을 수 없습니다."),
    USER_NAME_NOT_FOUND("이름 {0} 에 해당하는 사용자를 찾을 수 없습니다."),
    USER_EMAIL_NOT_FOUND("이메일 {0} 에 해당하는 사용자를 찾을 수 없습니다."),
    FAILED_AUTHENTICATION("사용자 인증에 실패했습니다."),
    UNAUTHORIZED_REQUEST("인증되지 않은 요청입니다. 로그인 후 다시 시도해주세요."),
    INVALID_CREDENTIALS("이름 혹은 비밀번호가 정확하지 않습니다."),
    SURVEY_NOT_FOUND("설문조사 정보를 찾을 수 없습니다."),
    INTERNAL_ERROR("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.\n{0}"),
    QUESTION_BANK_NOT_FOUND("존재하지 않는 질문입니다."),
    QUESTION_OPTION_NOT_FOUND("존재하지 않는 항목입니다."),
    QUESTION_NOT_FOUND("존재하지 않는 설문조사 또는 질문입니다."),
    SURVEY_ALREADY_STARTED("이미 시작된 설문조사입니다."),
    SURVEY_CREATE_FAILED("설문조사 생성을 실패하였습니다."),
    SURVEY_UPDATE_FAILED("설문조사 수정을 실패하였습니다."),
    SURVEY_DELETE_FAILED("설문조사 삭제를 실패하였습니다."),
    SURVEY_ANSWER_FAILED("설문조사 응답 제출을 실패하였습니다."),
    ANSWER_ALREADY_SUBMITED("이미 완료한 설문조사 입니다."),
    STARTEDDATE_ISAFTER_ENDEDDATE("설문조사 시작 시간이 종료 시간보다 앞설 수 없습니다."),
    INVALID_REQUEST("유효하지 않은 요청입니다");

    private final String message;

    ErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
