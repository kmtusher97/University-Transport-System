package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Assignment;
import com.transport.university.universitytransportsystem.model.AssignmentForm;
import com.transport.university.universitytransportsystem.service.AssignmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/schedule")
public class AssignmentController {

    @Autowired
    private AssignmentServices assignmentServices;

    @PostMapping("/add")
    public Assignment addAssignment(@RequestBody AssignmentForm assignmentForm) {
        return assignmentServices.addAssignment(assignmentForm);
    }

    @GetMapping("/all")
    public List<Assignment> getAll() {
        return assignmentServices.getAll();
    }
}
