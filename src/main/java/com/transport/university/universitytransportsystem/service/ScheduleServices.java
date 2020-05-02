package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.StoppageIdentifierException;
import com.transport.university.universitytransportsystem.model.Schedule;
import com.transport.university.universitytransportsystem.repository.ScheduleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ScheduleServices {
    @Autowired
    private ScheduleRepo scheduleRepo;

    public Schedule saveOrUpdate(Schedule schedule) {
        try {
            return scheduleRepo.save(schedule);
        } catch (RuntimeException ex) {
            throw ex;
        }
    }

    public void delete(Long id) {
        if (!scheduleRepo.existsById(id)) {
            throw new StoppageIdentifierException("Schedule Id: " + id + " does not exist");
        }
        scheduleRepo.deleteById(id);
    }

    public Schedule get(Long id) {
        if (!scheduleRepo.existsById(id)) {
            throw new StoppageIdentifierException("Schedule Id: " + id + " does not exist");
        }
        return scheduleRepo.getOne(id);
    }

    public List<Schedule> getAll() {
        return scheduleRepo.findAll();
    }
}
