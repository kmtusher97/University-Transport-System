package com.transport.university.universitytransportsystem.exceptions.notification;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotificationIdException extends RuntimeException{

    public NotificationIdException(String message) {
        super(message);
    }
}
