package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Schedule;
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


    public Boolean isValidAssignment(Schedule schedule) {
        if (schedule.getDate() == null) return false;
        if (schedule.getDepartureTime() == null) return false;
        if (schedule.getDuration() == null) return false;
        if (schedule.getBus() == null) return false;
        if (schedule.getDriver() == null) return false;
        if (schedule.getRoute() == null) return false;
        if (schedule.getBus().getBusId() == null) return false;
        if (schedule.getDriver().getDriverId() == null) return false;
        if (schedule.getRoute().getRouteId() == null) return false;
        if (!busRepo.existsById(schedule.getBus().getBusId())) return false;
        if (!driverRepo.existsById(schedule.getDriver().getDriverId())) return false;
        if (!routeRepo.existsById(schedule.getRoute().getRouteId())) return false;
        if (schedule.getStuff1() != null &&
                schedule.getStuff1().getStuffId() != null &&
                !stuffRepo.existsById(schedule.getStuff1().getStuffId())) return false;
        if (schedule.getStuff2() != null &&
                schedule.getStuff2().getStuffId() != null &&
                !stuffRepo.existsById(schedule.getStuff2().getStuffId())) return false;
        return true;
    }

    public Schedule addAssignment(Schedule schedule) {
        if (isValidAssignment(schedule)) {
            schedule.setBus(busRepo.getOne(schedule.getBus().getBusId()));
            schedule.setDriver(driverRepo.getOne(schedule.getDriver().getDriverId()));
            schedule.setRoute(routeRepo.getOne(schedule.getRoute().getRouteId()));
            if (schedule.getStuff1() != null) {
                schedule.setStuff1(stuffRepo.getOne(schedule.getStuff1().getStuffId()));
            }
            if (schedule.getStuff2() != null) {
                schedule.setStuff2(stuffRepo.getOne(schedule.getStuff2().getStuffId()));
            }
            return assignmentRepo.save(schedule);
        }
        return null;
    }

    public Schedule updateAssignment(Schedule schedule) {
        if (schedule.getAssignmentId() == null) return null;
        if (!assignmentRepo.existsById(schedule.getAssignmentId())) return null;
        return addAssignment(schedule);
    }

    public List<Schedule> getAllByDateRange(Date startDate, Date endDate) {
        return assignmentRepo.getAllByDateRange(startDate, endDate);
    }

    public List<Schedule> getNth30SchedulesFromLast(Long n) {
        Long scheduleCount = assignmentRepo.count();
        if (scheduleCount == 0 || n <= 0) return new ArrayList<>();
        return assignmentRepo.getNth30SchedulesFromLast(Math.max(0, scheduleCount - (n * 30)));
    }

    public void deleteAssignmentById(Long id) {
        if (assignmentRepo.existsById(id)) {
            assignmentRepo.deleteById(id);
        }
    }

    public Schedule getById(Long id) {
        if (!assignmentRepo.existsById(id)) return null;
        return assignmentRepo.getOne(id);
    }

    public Long getTotalCount() {
        return assignmentRepo.count();
    }
}
