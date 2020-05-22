package com.transport.university.universitytransportsystem.validation;

import com.transport.university.universitytransportsystem.model.Requisition;
import com.transport.university.universitytransportsystem.repository.BusRepo;
import com.transport.university.universitytransportsystem.repository.DriverRepo;
import com.transport.university.universitytransportsystem.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class RequisitionValidator implements Validator {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BusRepo busRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Override
    public boolean supports(Class<?> aClass) {
        return Requisition.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {

        Requisition requisition = (Requisition) o;

        if (requisition.getUser() == null) {
            errors.rejectValue("user", "user", "user is required");
        } else if (requisition.getUser().getEmail() == null || !userRepo.existsByEmail(requisition.getUser().getEmail()) ||
                !userRepo.findByEmail(requisition.getUser().getEmail()).equals(requisition.getUser())) {
            errors.rejectValue("user", "user", "user is invalid");
        }

        if (requisition.getBus() == null) {
            errors.rejectValue("bus", "bus is required");
        } else if (requisition.getBus().getBusId() == null || !busRepo.existsById(requisition.getBus().getBusId()) ||
                !busRepo.getOne(requisition.getBus().getBusId()).equals(requisition.getBus())) {
            errors.rejectValue("bus", "busId", "bus is invalid");
        }

        if (requisition.getDriver() == null) {
            errors.rejectValue("driver", "driver", "Driver is required");
        } else if (requisition.getDriver().getDriverId() == null || !driverRepo.existsById(requisition.getDriver().getDriverId()) ||
                !driverRepo.getOne(requisition.getDriver().getDriverId()).equals(requisition.getDriver())) {
            errors.rejectValue("driver", "driver", "driver is invalid");
        }
    }
}
