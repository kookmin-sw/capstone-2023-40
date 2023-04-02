package com.thesurvey.api.exception;

import java.util.Objects;
import javax.validation.ConstraintViolationException;
import javax.validation.UnexpectedTypeException;
import org.postgresql.util.PSQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalAPIExceptionHandler {

    /**
     * handles exception thrown by ExceptionMapper.
     */
    @ExceptionHandler(ExceptionMapper.class)
    public ResponseEntity<String> handleExceptionMapperException(Exception error) {
        return ResponseEntity.badRequest().body(error.getMessage());
    }

    /**
     * handles the exception thrown by the validation of the DTO.
     * thrown when a validation constraint specified on a field or method parameter fails
     * such as @NotNull, @Size, and @Pattern.
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
            .orElse(new ExceptionMapper(ErrorMessage.INVALID_REQUEST).getMessage());
        return ResponseEntity.badRequest().body(errorMessage);
    }

    /**
     * handles the exception thrown by PSQLException.
     * thrown when there is an error while interacting with PostgreSQL database.
     */
    @ExceptionHandler(PSQLException.class)
    public ResponseEntity<String> handlePSQLException(PSQLException error) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("이미 존재하는 " + Objects.requireNonNull(error.getServerErrorMessage()).getTable() + " 입니다.");
    }

    /**
     * handles the exception thrown by MethodArgumentNotValidException.
     * thrown when an argument annotated with @Valid fails validation in controller.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleMethodArgumentNotValidException(
        MethodArgumentNotValidException error) {
        String field = Objects.requireNonNull(error.getBindingResult().getFieldError()).getField();
        String errorMessage = error.getAllErrors().get(0).getDefaultMessage();
        return ResponseEntity.badRequest().body(field + " : " + errorMessage);
    }

    /**
     * handles the exception thrown by UnexpectedTypeException.
     * thrown when the type of the validated object or its property is not as expected.
     */
    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity<String> handleUnexpectedTypeException(UnexpectedTypeException error) {
        return ResponseEntity.badRequest().body("유효하지 않은 타입입니다.");
    }

}

