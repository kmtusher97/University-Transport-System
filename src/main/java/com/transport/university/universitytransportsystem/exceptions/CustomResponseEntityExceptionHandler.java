package com.transport.university.universitytransportsystem.exceptions;

import com.transport.university.universitytransportsystem.exceptions.stoppage.StoppageIdentifierException;
import com.transport.university.universitytransportsystem.exceptions.stoppage.StoppageIdentifierExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleStoppageIdException(StoppageIdentifierException ex, WebRequest request) {
        StoppageIdentifierExceptionResponse exceptionResponse = new StoppageIdentifierExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
