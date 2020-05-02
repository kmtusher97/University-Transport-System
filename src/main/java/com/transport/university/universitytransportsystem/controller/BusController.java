package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Bus;
import com.transport.university.universitytransportsystem.service.BusServices;
import com.transport.university.universitytransportsystem.validation.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/bus")
public class BusController {

    @Autowired
    private BusServices busServices;

    @Autowired
    private MapValidationErrorService errorService;

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
    public ResponseEntity<?> addNewBus(@Valid @RequestBody Bus bus, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        return new ResponseEntity<>(busServices.addNewBus(bus), HttpStatus.CREATED);
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
    public ResponseEntity<?> updateBusInfo(@Valid @RequestBody Bus bus, BindingResult result) {
        if (bus.getBusId() == null) return errorService.mapNullIdErrorService("budId");
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        return new ResponseEntity<>(busServices.addNewBus(bus), HttpStatus.CREATED);
    }

    @GetMapping("/DRIVER/trip/finished/{busId}/{driverId}")
    public Bus markBusAsFinishedTrip(
            @PathVariable("busId") Integer busId,
            @PathVariable("driverId") Integer driverId
    ) {
        return busServices.markBusAsFinishedTrip(busId, driverId);
    }
}
