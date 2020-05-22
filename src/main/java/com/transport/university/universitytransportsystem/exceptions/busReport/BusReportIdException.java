package com.transport.university.universitytransportsystem.exceptions.busReport;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BusReportIdException extends RuntimeException {

    public BusReportIdException(String message) {
        super(message);
    }
}
