package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Assignment;
import com.transport.university.universitytransportsystem.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
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


    public Boolean isValidAssignment(Assignment assignment) {
        if (assignment.getDate() == null) return false;
        if (assignment.getDepartureTime() == null) return false;
        if (assignment.getDuration() == null) return false;
        if (assignment.getBus() == null) return false;
        if (assignment.getDriver() == null) return false;
        if (assignment.getRoute() == null) return false;
        if (assignment.getBus().getBusId() == null) return false;
        if (assignment.getDriver().getDriverId() == null) return false;
        if (assignment.getRoute().getRouteId() == null) return false;
        if (!busRepo.existsById(assignment.getBus().getBusId())) return false;
        if (!driverRepo.existsById(assignment.getDriver().getDriverId())) return false;
        if (!routeRepo.existsById(assignment.getRoute().getRouteId())) return false;
        if (assignment.getStuff1() != null &&
                assignment.getStuff1().getStuffId() != null &&
                !stuffRepo.existsById(assignment.getStuff1().getStuffId())) return false;
        if (assignment.getStuff2() != null &&
                assignment.getStuff2().getStuffId() != null &&
                !stuffRepo.existsById(assignment.getStuff2().getStuffId())) return false;
        return true;
    }

    public Assignment addAssignment(Assignment assignment) {
        if (isValidAssignment(assignment)) {
            assignment.setBus(busRepo.getOne(assignment.getBus().getBusId()));
            assignment.setDriver(driverRepo.getOne(assignment.getDriver().getDriverId()));
            assignment.setRoute(routeRepo.getOne(assignment.getRoute().getRouteId()));
            if (assignment.getStuff1() != null) {
                assignment.setStuff1(stuffRepo.getOne(assignment.getStuff1().getStuffId()));
            }
            if (assignment.getStuff2() != null) {
                assignment.setStuff2(stuffRepo.getOne(assignment.getStuff2().getStuffId()));
            }
            return assignmentRepo.save(assignment);
        }
        return null;
    }

    public Assignment updateAssignment(Assignment assignment) {
        if (assignment.getAssignmentId() == null) return null;
        if (!assignmentRepo.existsById(assignment.getAssignmentId())) return null;
        return addAssignment(assignment);
    }

    public List<Assignment> getAllByDateRange(Date startDate, Date endDate) {
        return assignmentRepo.getAllByDateRange(startDate, endDate);
    }

    public List<Assignment> getNth30SchedulesFromLast(Long n) {
        Long scheduleCount = assignmentRepo.count();
        if (scheduleCount == 0 || n <= 0) return new ArrayList<>();
        return assignmentRepo.getNth30SchedulesFromLast(Math.max(0, scheduleCount - (n * 30)));
    }

    public void deleteAssignmentById(Long id) {
        if (assignmentRepo.existsById(id)) {
            assignmentRepo.deleteById(id);
        }
    }
}
