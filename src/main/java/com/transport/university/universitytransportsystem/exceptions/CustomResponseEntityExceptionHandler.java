package com.transport.university.universitytransportsystem.exceptions;

import com.transport.university.universitytransportsystem.exceptions.bus.BusIdException;
import com.transport.university.universitytransportsystem.exceptions.bus.BusIdExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.bus.BusNumberException;
import com.transport.university.universitytransportsystem.exceptions.bus.BusNumberExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.schedule.ScheduleIdException;
import com.transport.university.universitytransportsystem.exceptions.schedule.ScheduleIdExceptionResponse;
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

    @ExceptionHandler
    public final ResponseEntity<Object> handleBusIdException(BusIdException ex, WebRequest request) {
        BusIdExceptionResponse exceptionResponse = new BusIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleBusNumberException(BusNumberException ex, WebRequest request) {
        BusNumberExceptionResponse exceptionResponse = new BusNumberExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final  ResponseEntity<Object> handleScheduleNumberException(ScheduleIdException ex, WebRequest request) {
        ScheduleIdExceptionResponse exceptionResponse = new ScheduleIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
