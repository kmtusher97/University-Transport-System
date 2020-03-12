package com.transport.university.universitytransportsystem.service;

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
        if (driverRepo.existsByUser(userServices.getUserByUserId(userId))) {
            return null;
        }
        Driver driver = new Driver();
        driver.setUser(userServices.getUserByUserId(userId));
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
        userServices.blockUser(driver.getUser().getUserId());
        return driverRepo.save(driver);
    }

    public Driver reEmployDriver(Integer driverId) {
        if (driverRepo.existsById(driverId)) {
            Driver driver = driverRepo.getOne(driverId);
            driver.setIsInService(true);
            userServices.unblockUser(driver.getUser().getUserId());
            return driverRepo.save(driver);
        }
        return null;
    }
}
