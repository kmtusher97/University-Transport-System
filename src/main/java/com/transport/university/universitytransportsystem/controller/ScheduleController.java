package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Schedule;
import com.transport.university.universitytransportsystem.service.ScheduleServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleServices scheduleServices;

    @PostMapping("/add")
    public Schedule addAssignment(@RequestBody Schedule schedule) {
        return scheduleServices.saveOrUpdate(schedule);
    }

    @DeleteMapping("/{id}")
    public void deleteAssignmentById(@PathVariable("id") Long id) {
        scheduleServices.delete(id);
    }

    @GetMapping("/{id}")
    public Schedule getAssignmentById(@PathVariable("id") Long id) {
        return scheduleServices.get(id);
    }
}
