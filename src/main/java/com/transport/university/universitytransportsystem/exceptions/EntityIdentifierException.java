package com.transport.university.universitytransportsystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EntityIdentifierException extends RuntimeException {

    public EntityIdentifierException(String message) {
        super(message);
    }
}
