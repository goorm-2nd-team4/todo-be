package com.goorm.team04.todobe.common.exception;

import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException e) {
        Map<String, String> errors = new LinkedHashMap<>();
        for (FieldError error : e.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        return ResponseEntity.badRequest()
                .body(errorBody(HttpStatus.BAD_REQUEST, "요청 값이 올바르지 않습니다.", errors));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFoundException(EntityNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(errorBody(HttpStatus.NOT_FOUND, e.getMessage(), Map.of()));
    }

    private Map<String, Object> errorBody(HttpStatus status, String message, Map<String, ?> errors) {
        return Map.of(
                "timestamp", LocalDateTime.now(),
                "status", status.value(),
                "message", message,
                "errors", errors
        );
    }
}
