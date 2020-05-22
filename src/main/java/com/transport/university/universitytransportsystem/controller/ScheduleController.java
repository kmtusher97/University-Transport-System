package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Schedule;
import com.transport.university.universitytransportsystem.service.ScheduleServices;
import com.transport.university.universitytransportsystem.validation.MapValidationErrorService;
import com.transport.university.universitytransportsystem.validation.ScheduleValidatorServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleServices scheduleServices;

    @Autowired
    private MapValidationErrorService errorService;

    @Autowired
    private ScheduleValidatorServices scheduleValidatorServices;

    @PostMapping("/add")
    public ResponseEntity<?> addOrUpdate(@Valid @RequestBody Schedule schedule, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        errorMap = scheduleValidatorServices.validateSchedule(schedule);
        if (errorMap != null) return errorMap;
        return new ResponseEntity<>(scheduleServices.saveOrUpdate(schedule), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        scheduleServices.delete(id);
        return new ResponseEntity<>("Schedule with ID: " + id + " was deleted", HttpStatus.OK);
    }

    @GetMapping("/GLOBAL/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(scheduleServices.get(id), HttpStatus.OK);
    }

    @GetMapping("/GLOBAL/all")
    public List<Schedule> getAll() {
        return scheduleServices.getAll();
    }
}
