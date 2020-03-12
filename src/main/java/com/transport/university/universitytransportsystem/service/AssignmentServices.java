package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Assignment;
import com.transport.university.universitytransportsystem.model.AssignmentForm;
import com.transport.university.universitytransportsystem.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AssignmentServices {
    @Autowired
    private AssignmentRepo assignmentRepo;

    @Autowired
    private BusRepo busRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private StuffRepo stuffRepo;

    @Autowired
    private RouteRepo routeRepo;


    public Boolean isValidAssignment(AssignmentForm assignmentForm) {
        if (assignmentForm.getDate() == null) return false;
        if (assignmentForm.getDepartureTime() == null) return false;
        if (assignmentForm.getDuration() == null) return false;
        if (assignmentForm.getBusId() == null) return false;
        if (assignmentForm.getDriverId() == null) return false;
        if (assignmentForm.getRouteId() == null) return false;
        if (!busRepo.existsById(assignmentForm.getBusId())) return false;
        if (!driverRepo.existsById(assignmentForm.getDriverId())) return false;
        if (!routeRepo.existsById(assignmentForm.getRouteId())) return false;
        if (assignmentForm.getStuff1Id() != null &&
                !stuffRepo.existsById(assignmentForm.getStuff1Id())) return false;
        if (assignmentForm.getStuff2Id() != null &&
                !stuffRepo.existsById(assignmentForm.getStuff2Id())) return false;
        return true;
    }

    public Assignment addAssignment(AssignmentForm assignmentForm) {
        if (isValidAssignment(assignmentForm)) {
            Assignment assignment = new Assignment();
            assignment.setDate(assignmentForm.getDate());
            assignment.setDepartureTime(assignmentForm.getDepartureTime());
            assignment.setDuration(assignmentForm.getDuration());
            assignment.setBus(busRepo.getOne(assignmentForm.getBusId()));
            assignment.setDriver(driverRepo.getOne(assignmentForm.getDriverId()));
            assignment.setRoute(routeRepo.getOne(assignmentForm.getRouteId()));
            if (assignmentForm.getStuff1Id() != null) {
                assignment.setStuff1(stuffRepo.getOne(assignmentForm.getStuff1Id()));
            }
            if (assignmentForm.getStuff2Id() != null) {
                assignment.setStuff2(stuffRepo.getOne(assignmentForm.getStuff2Id()));
            }
            return assignmentRepo.save(assignment);
        }
        return null;
    }

    public List<Assignment> getAll() {
        return assignmentRepo.findAll();
    }
}
