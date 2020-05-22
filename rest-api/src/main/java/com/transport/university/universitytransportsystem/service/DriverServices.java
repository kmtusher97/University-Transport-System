package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.driver.DriverIdException;
import com.transport.university.universitytransportsystem.model.Driver;
import com.transport.university.universitytransportsystem.model.Schedule;
import com.transport.university.universitytransportsystem.repository.DriverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DriverServices {

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private UserServices userServices;

    @Autowired
    private StuffServices stuffServices;


    public List<Driver> getAllDriversInService() {
        return driverRepo.findAllInServiceDrivers();
    }

    public List<Driver> getAllDriversExService() {
        return driverRepo.findAllExServiceDrivers();
    }


    public Driver getDriver(Integer driverId) {
        if (!driverRepo.existsById(driverId)) {
            throw new DriverIdException("Driver with Id: " + driverId + " does not exist");
        }
        return driverRepo.getOne(driverId);
    }

    public void removerDriver(Integer driverId) {
        if (!driverRepo.existsById(driverId)) {
            throw new DriverIdException("Driver with ID: " + driverId + " doesn't exists");
        }
        Driver driver = driverRepo.getOne(driverId);
        driver.setIsInService(false);
        driverRepo.save(driver);
    }

    public List<Schedule> getSchedules(Integer driverId) {
        if (!driverRepo.existsById(driverId)) {
            throw new DriverIdException("Driver with ID: " + driverId + " doesn't exists");
        }
        return driverRepo.getOne(driverId).getSchedules()
                .stream()
                .filter(schedule -> schedule.getIsComplete() == false)
                .collect(Collectors.toList());
    }
}
