package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Driver;
import com.transport.university.universitytransportsystem.service.DriverServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/driver")
public class DriverController {

    @Autowired
    private DriverServices driverServices;

    @GetMapping("/inService/all")
    public List<Driver> getAllDriversInService() {
        return driverServices.getAllDriversInService();
    }

    @GetMapping("/exService/all")
    public List<Driver> getAllDriversExService() {
        return driverServices.getAllDriversExService();
    }

    @GetMapping("/add/{userId}")
    public Driver addNewDriver(@PathVariable("userId") Integer userId) {
        return driverServices.addNewDriver(userId);
    }

    @GetMapping("/remove/{driverId}")
    public Driver removeDriver(@PathVariable("driverId") Integer driverId) {
        return driverServices.removeDriver(driverId);
    }

    @GetMapping("/reEmploy/{driverId}")
    public Driver reEmployDriver(@PathVariable("driverId") Integer driverId) {
        return driverServices.reEmployDriver(driverId);
    }
}
