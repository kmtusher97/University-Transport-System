package com.transport.university.universitytransportsystem.exceptions.schedule;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ScheduleIdException extends RuntimeException {
    public ScheduleIdException(String message) {
        super(message);
    }
}
