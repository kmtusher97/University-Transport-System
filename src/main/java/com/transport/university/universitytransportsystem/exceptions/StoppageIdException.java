package com.transport.university.universitytransportsystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class StoppageIdException extends RuntimeException {

    public StoppageIdException(String message) {
        super(message);
    }
}
