package com.transport.university.universitytransportsystem.exceptions.requisition;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RequisitionNotFoundException extends RuntimeException {

    public RequisitionNotFoundException(String message) {
        super(message);
    }
}
