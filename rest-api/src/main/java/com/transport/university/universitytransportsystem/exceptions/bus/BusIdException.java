package com.transport.university.universitytransportsystem.exceptions.bus;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BusIdException extends RuntimeException {

    public BusIdException(String message) {
        super(message);
    }
}
