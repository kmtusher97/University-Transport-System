package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Bus;
import com.transport.university.universitytransportsystem.service.BusServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/bus")
public class BusController {

    @Autowired
    private BusServices busServices;

    @GetMapping("/all")
    public List<Bus> getAllBuses() {
        return busServices.getAllBuses();
    }

    @GetMapping("/GLOBAL/getById/{busId}")
    public Bus getBusByBusId(@PathVariable("busId") Integer busId) {
        return busServices.getBusByBusId(busId);
    }

    @GetMapping("/GLOBAL/getByNumber/{number}")
    public Bus getBusByBusNumber(@PathVariable("number") String busNumber) {
        return busServices.getBusByBusNumber(busNumber);
    }

    @PostMapping("/add")
    public Bus addNewBus(@RequestBody Bus bus) {
        return busServices.addNewBus(bus);
    }

    @DeleteMapping("/deleteById/{busId}")
    public void deleteBusByBusId(@PathVariable("busId") Integer busId) {
        busServices.deleteBusByBusId(busId);
    }

    @DeleteMapping("/deleteByNumber/{number}")
    public void deleteBusByBusId(@PathVariable("number") String busNumber) {
        busServices.deleteBusByBusNumber(busNumber);
    }

    @PostMapping("/update")
    public Bus updateBusInfo(@RequestBody Bus bus) {
        return busServices.updateBus(bus);
    }

    @GetMapping("/DRIVER/trip/finished/{busId}/{driverId}")
    public Bus markBusAsFinishedTrip(
            @PathVariable("busId") Integer busId,
            @PathVariable("driverId") Integer driverId
    ) {
        return busServices.markBusAsFinishedTrip(busId, driverId);
    }
}
