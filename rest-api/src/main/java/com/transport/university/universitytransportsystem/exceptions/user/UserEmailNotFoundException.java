package com.transport.university.universitytransportsystem.exceptions.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserEmailNotFoundException extends RuntimeException {

    public UserEmailNotFoundException(String message) {
        super(message);
    }
}
