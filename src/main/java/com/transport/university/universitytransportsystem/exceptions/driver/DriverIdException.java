package com.transport.university.universitytransportsystem.exceptions.driver;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DriverIdException extends RuntimeException {
    public DriverIdException(String message) {
        super(message);
    }
}
