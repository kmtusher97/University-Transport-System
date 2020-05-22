package com.transport.university.universitytransportsystem.exceptions.route;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RouteIdException extends RuntimeException {
    public RouteIdException(String message) {
        super(message);
    }
}
