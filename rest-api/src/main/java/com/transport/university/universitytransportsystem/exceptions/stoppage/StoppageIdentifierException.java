package com.transport.university.universitytransportsystem.exceptions.stoppage;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class StoppageIdentifierException extends RuntimeException {

    public StoppageIdentifierException(String message) {
        super(message);
    }
}
