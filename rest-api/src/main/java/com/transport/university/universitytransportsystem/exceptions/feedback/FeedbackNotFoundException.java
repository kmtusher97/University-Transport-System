package com.transport.university.universitytransportsystem.exceptions.feedback;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class FeedbackNotFoundException extends RuntimeException {

    public FeedbackNotFoundException(String message) {
        super(message);
    }
}
