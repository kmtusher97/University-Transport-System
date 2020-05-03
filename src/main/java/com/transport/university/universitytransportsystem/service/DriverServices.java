package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.driver.DriverIdException;
import com.transport.university.universitytransportsystem.model.Driver;
import com.transport.university.universitytransportsystem.model.User;
import com.transport.university.universitytransportsystem.repository.DriverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public Driver addNewDriver(Integer userId) {
        if (!userServices.isValidUser(userId)) {
            return null;
        }
        User user = userServices.getUserByUserId(userId);
        stuffServices.removerStuffByUser(user);
        if (driverRepo.existsByUser(userServices.getUserByUserId(userId))) {
            return reEmployDriver(driverRepo.findByUser(user).getDriverId());
        }
        Driver driver = new Driver();
        driver.setUser(user);
        driver.setRating(0);
        driver.setIsInService(true);
        return driverRepo.save(driver);
    }

    public Driver removeDriver(Integer driverId) {
        if (!driverRepo.existsById(driverId)) {
            return null;
        }
        Driver driver = driverRepo.getOne(driverId);
        driver.setIsInService(false);
        return driverRepo.save(driver);
    }

    public Driver removerDriverByUser(User user) {
        if (driverRepo.existsByUser(user)) {
            Driver driver = driverRepo.findByUser(user);
            return removeDriver(driver.getDriverId());
        }
        return null;
    }

    public Driver reEmployDriver(Integer driverId) {
        if (driverRepo.existsById(driverId)) {
            Driver driver = driverRepo.getOne(driverId);
            driver.setIsInService(true);
            return driverRepo.save(driver);
        }
        return null;
    }

    public Driver getDriver(Integer driverId) {
        if (!driverRepo.existsById(driverId)) {
            throw new DriverIdException("Driver with Id: " + driverId + " does not exist");
        }
        return driverRepo.getOne(driverId);
    }
}
