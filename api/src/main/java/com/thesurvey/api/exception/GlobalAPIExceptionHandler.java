package com.thesurvey.api.exception;

import com.thesurvey.api.exception.mapper.BadRequestExceptionMapper;
import com.thesurvey.api.exception.mapper.ForbiddenRequestExceptionMapper;
import com.thesurvey.api.exception.mapper.NotFoundExceptionMapper;
import com.thesurvey.api.exception.mapper.UnauthorizedRequestExceptionMapper;

import java.util.Objects;

import javax.validation.ConstraintViolationException;
import javax.validation.UnexpectedTypeException;

import org.postgresql.util.PSQLException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalAPIExceptionHandler {

    @ExceptionHandler(NotFoundExceptionMapper.class)
    public ResponseEntity<String> handleNotFoundRequestException(NotFoundExceptionMapper error) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error.getMessage());
    }

    @ExceptionHandler(UnauthorizedRequestExceptionMapper.class)
    public ResponseEntity<String> handleUnauthorizedRequestException(
        UnauthorizedRequestExceptionMapper error) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error.getMessage());
    }

    @ExceptionHandler(ForbiddenRequestExceptionMapper.class)
    public ResponseEntity<String> handleForbiddenRequestException(
        ForbiddenRequestExceptionMapper error) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error.getMessage());
    }

    @ExceptionHandler(BadRequestExceptionMapper.class)
    public ResponseEntity<String> handleBadRequestExceptionMapperException(
        BadRequestExceptionMapper error) {
        return ResponseEntity.badRequest().body(error.getMessage());
    }

    /**
     * handles the exception thrown by hibernate at jpa layer. thrown when a validation constraint
     * specified on a field or method parameter fails such as @NotNull, @Size, and @Pattern.
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleValidationException(ConstraintViolationException error) {
        String errorMessage = error.getConstraintViolations().stream()
            .map(constraintViolation -> {
                String propertyPath = constraintViolation.getPropertyPath().toString();
                String fieldName = propertyPath.substring(propertyPath.lastIndexOf(".") + 1);
                return fieldName + " : " + constraintViolation.getMessage();
            })
            .findFirst()
            .orElse(new BadRequestExceptionMapper(ErrorMessage.INVALID_REQUEST).getMessage());
        return ResponseEntity.badRequest().body(errorMessage);
    }

    /**
     * handles the exception thrown by PSQLException. thrown when there is an error while
     * interacting with PostgreSQL database.
     */
    @ExceptionHandler(PSQLException.class)
    public ResponseEntity<String> handlePSQLException(PSQLException error) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("이미 존재하는 " + Objects.requireNonNull(error.getServerErrorMessage()).getTable()
                + " 입니다.");
    }

    /**
     * handles the exception thrown by MethodArgumentNotValidException at controller/service layer.
     * thrown when an argument annotated with @Valid fails validation.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleMethodArgumentNotValidException(
        MethodArgumentNotValidException error) {
        String field = Objects.requireNonNull(error.getBindingResult().getFieldError()).getField();
        String errorMessage = error.getAllErrors().get(0).getDefaultMessage();
        return ResponseEntity.badRequest().body(field + " : " + errorMessage);
    }

    /**
     * handles the exception thrown by UnexpectedTypeException. thrown when the type of the
     * validated object or its property is not as expected.
     */
    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity<String> handleUnexpectedTypeException(UnexpectedTypeException error) {
        return ResponseEntity.badRequest().body("유효하지 않은 타입입니다.");
    }

    /**
     * handles the exception thrown by HttpMessageNotReadableException. thrown when there is an
     * error while converting the HTTP request body to a Java object.
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleHttpMessageNotReadableException(
        HttpMessageNotReadableException error) {
        return ResponseEntity.badRequest().body("유효하지 않은 요청 메시지입니다.");
    }
}

