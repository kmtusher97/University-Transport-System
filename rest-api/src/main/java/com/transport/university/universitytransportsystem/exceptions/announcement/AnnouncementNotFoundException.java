package com.transport.university.universitytransportsystem.exceptions.announcement;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AnnouncementNotFoundException extends RuntimeException {

    public AnnouncementNotFoundException(String message) {
        super(message);
    }
}
