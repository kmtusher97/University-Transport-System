package com.transport.university.universitytransportsystem.exceptions;

import com.transport.university.universitytransportsystem.exceptions.bus.BusIdException;
import com.transport.university.universitytransportsystem.exceptions.bus.BusIdExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.bus.BusNumberException;
import com.transport.university.universitytransportsystem.exceptions.bus.BusNumberExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.busReport.BusReportIdException;
import com.transport.university.universitytransportsystem.exceptions.busReport.BusReportIdExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.driver.DriverIdException;
import com.transport.university.universitytransportsystem.exceptions.driver.DriverIdExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.notification.NotificationIdException;
import com.transport.university.universitytransportsystem.exceptions.notification.NotificationIdExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.route.DuplicateRouteException;
import com.transport.university.universitytransportsystem.exceptions.route.DuplicateRouteExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.route.RouteIdException;
import com.transport.university.universitytransportsystem.exceptions.route.RouteIdExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.schedule.ScheduleIdException;
import com.transport.university.universitytransportsystem.exceptions.schedule.ScheduleIdExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.stoppage.StoppageIdentifierException;
import com.transport.university.universitytransportsystem.exceptions.stoppage.StoppageIdentifierExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.stuff.StuffIdException;
import com.transport.university.universitytransportsystem.exceptions.stuff.StuffIdExceptionResponse;
import com.transport.university.universitytransportsystem.exceptions.user.UserEmailAlreadyExistsException;
import com.transport.university.universitytransportsystem.exceptions.user.UserEmailAlreadyExistsExceptionResponse;
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
    public final ResponseEntity<Object> handleRouteIdException(RouteIdException ex, WebRequest request) {
        RouteIdExceptionResponse exceptionResponse = new RouteIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleDuplicateRouteException(DuplicateRouteException ex, WebRequest request) {
        DuplicateRouteExceptionResponse exceptionResponse = new DuplicateRouteExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleScheduleIdException(ScheduleIdException ex, WebRequest request) {
        ScheduleIdExceptionResponse exceptionResponse = new ScheduleIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleDriverIdException(DriverIdException ex, WebRequest request) {
        DriverIdExceptionResponse exceptionResponse = new DriverIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleStuffIdException(StuffIdException ex, WebRequest request) {
        StuffIdExceptionResponse exceptionResponse = new StuffIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleBusReportIdException(BusReportIdException ex, WebRequest request) {
        BusReportIdExceptionResponse exceptionResponse = new BusReportIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleNotificationIdException(NotificationIdException ex, WebRequest request) {
        NotificationIdExceptionResponse exceptionResponse = new NotificationIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleDuplicationEmailException(UserEmailAlreadyExistsException ex, WebRequest request) {
        UserEmailAlreadyExistsExceptionResponse exceptionResponse = new UserEmailAlreadyExistsExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
