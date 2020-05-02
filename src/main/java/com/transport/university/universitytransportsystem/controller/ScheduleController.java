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
        return scheduleServices.addAssignment(schedule);
    }

    @PostMapping("/update")
    public Schedule updateAssignment(@RequestBody Schedule schedule) {
        return scheduleServices.updateAssignment(schedule);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteAssignmentById(@PathVariable("id") Long id) {
        scheduleServices.deleteAssignmentById(id);
    }

    @GetMapping("/totalCount")
    public Long getTotalCount() {
        return scheduleServices.getTotalCount();
    }

    @GetMapping("/getById/{id}")
    public Schedule getAssignmentById(@PathVariable("id") Long id) {
        return scheduleServices.getById(id);
    }

    @GetMapping("/GLOBAL/getSchedules/{n}")
    public List<Schedule> getNth30SchedulesFromLast(@PathVariable("n") Long n) {
        List<Schedule> scheduleList = scheduleServices.getNth30SchedulesFromLast(n);
        Collections.reverse(scheduleList);
        return scheduleList;
    }

    @PostMapping("/GLOBAL/getAllByDate")
    public List<Schedule> getAllByDateRange(@RequestBody List<Date> dates) {
        if (dates == null || dates.size() != 2) return null;
        Date startDate = dates.get(0);
        Date endDate = dates.get(1);
        if (startDate.compareTo(endDate) == 1) return null;
        return scheduleServices.getAllByDateRange(startDate, endDate);
    }
}
