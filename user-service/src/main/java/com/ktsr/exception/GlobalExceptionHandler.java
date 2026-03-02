package com.ktsr.exception;

import com.ktsr.response.ExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
     public ResponseEntity<ExceptionResponse> exception(Exception exception, WebRequest request) {
         ExceptionResponse exceptionResponse = new ExceptionResponse(
                 exception.getMessage(),
                 request.getDescription(false), LocalDateTime.now()
         );
         return ResponseEntity.ok(exceptionResponse);
     }
}
