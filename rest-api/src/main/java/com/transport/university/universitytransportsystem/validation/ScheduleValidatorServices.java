package com.transport.university.universitytransportsystem.validation;

import com.transport.university.universitytransportsystem.model.Schedule;
import com.transport.university.universitytransportsystem.service.BusServices;
import com.transport.university.universitytransportsystem.service.DriverServices;
import com.transport.university.universitytransportsystem.service.RouteServices;
import com.transport.university.universitytransportsystem.service.StuffServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ScheduleValidatorServices {

    @Autowired
    private BusServices busServices;

    @Autowired
    private RouteServices routeServices;

    @Autowired
    private DriverServices driverServices;

    @Autowired
    private StuffServices stuffServices;

    public ResponseEntity<?> validateSchedule(Schedule schedule) {
        Map<String, String> errorMap = new HashMap<>();
        if (schedule.getBus().getBusId() == null ||
                !busServices.getBusByBusId(schedule.getBus().getBusId()).equals(schedule.getBus())) {
            errorMap.put("bus", "Invalid Bus");
        }
        if (schedule.getRoute().getRouteId() == null ||
                !routeServices.getRoute(schedule.getRoute().getRouteId()).equals(schedule.getRoute())) {
            errorMap.put("route", "Invalid Route");
        }
        if (schedule.getDriver().getDriverId() == null ||
                !driverServices.getDriver(schedule.getDriver().getDriverId()).equals(schedule.getDriver())) {
            errorMap.put("driver", "Invalid Driver");
        }
        if (schedule.getStuff() != null && (schedule.getStuff().getStuffId() == null ||
                !stuffServices.getStuffById(schedule.getStuff().getStuffId()).equals(schedule.getStuff()))) {
            errorMap.put("stuff", "Invalid Stuff");
        }
        if (errorMap.size() == 0) return null;
        return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
    }
}
