package com.transport.university.universitytransportsystem.exceptions.stuff;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class StuffIdException extends RuntimeException {
    public StuffIdException(String message) {
        super(message);
    }
}
