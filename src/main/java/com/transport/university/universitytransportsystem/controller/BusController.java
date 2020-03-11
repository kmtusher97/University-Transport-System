package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Bus;
import com.transport.university.universitytransportsystem.service.BusServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/bus")
public class BusController {

    @Autowired
    private BusServices busServices;

    @GetMapping("/all")
    public List<Bus> getAllBuses() {
        return busServices.getAllBuses();
    }

    @GetMapping("/getById/{busId}")
    public Bus getBusByBusId(@PathVariable("busId") Integer busId) {
        return busServices.getBusByBusId(busId);
    }

    @GetMapping("/getByNumber/{number}")
    public Bus getBusByBusNumber(@PathVariable("number") String busNumber) {
        return busServices.getBusByBusNumber(busNumber);
    }

    @PostMapping("/add")
    public Bus addNewBus(@RequestBody Bus bus) {
        return busServices.addNewBus(bus);
    }
}
