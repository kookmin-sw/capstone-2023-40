package com.thesurvey.api.exception;

import javax.validation.ConstraintViolationException;
import org.postgresql.util.PSQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalAPIExceptionHandler {

    /*
        @handleExceptionMapperException handles the exception thrown by ExceptionMapper.
    */
    @ExceptionHandler(ExceptionMapper.class)
    public ResponseEntity<String> handleExceptionMapperException(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    /*
        @handleValidationException handles the exception thrown by the validation of the DTO.
    */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleValidationException(ConstraintViolationException e) {
        String errorMessage = e.getConstraintViolations().stream()
            .map(constraintViolation -> {
                String propertyPath = constraintViolation.getPropertyPath().toString();
                String fieldName = propertyPath.substring(propertyPath.lastIndexOf(".") + 1);
                return fieldName + " : " + constraintViolation.getMessage();
            })
            .findFirst()
            .orElse(new ExceptionMapper(ErrorMessage.INVALID_REQUEST).getMessage());
        return ResponseEntity.badRequest().body(errorMessage);
    }

    /*
        @handlePSQLException handles the exception thrown by PSQLException.
    */
    @ExceptionHandler(PSQLException.class)
    public ResponseEntity<String> handlePSQLException(PSQLException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("이미 존재하는 " + e.getServerErrorMessage().getTable() + " 입니다.");
    }



}

