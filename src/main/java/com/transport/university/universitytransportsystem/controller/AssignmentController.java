package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Assignment;
import com.transport.university.universitytransportsystem.service.AssignmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "api/schedule")
public class AssignmentController {

    @Autowired
    private AssignmentServices assignmentServices;

    @PostMapping("/add")
    public Assignment addAssignment(@RequestBody Assignment assignment) {
        return assignmentServices.addAssignment(assignment);
    }

    @GetMapping("/getSchedules/{n}")
    public List<Assignment> getNth30SchedulesFromLast(@PathVariable("n") Long n) {
        return assignmentServices.getNth30SchedulesFromLast(n);
    }

    @PostMapping("/allByDate")
    public List<Assignment> getAllByDateRange(@RequestBody List<Date> dates) {
        if (dates == null || dates.size() != 2) return null;
        Date startDate = dates.get(0);
        Date endDate = dates.get(1);
        if (startDate.compareTo(endDate) == 1) return null;
        return assignmentServices.getAllByDateRange(startDate, endDate);
    }
}
