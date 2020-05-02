package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Schedule;
import com.transport.university.universitytransportsystem.repository.ScheduleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class ScheduleServices {
    @Autowired
    private ScheduleRepo scheduleRepo;

    public Schedule saveOrUpdate(Schedule schedule) {
        return scheduleRepo.save(schedule);
    }

    public void delete(Long id) {
        if (scheduleRepo.existsById(id)) {
            scheduleRepo.deleteById(id);
        }
    }

    public Schedule get(Long id) {
        if (!scheduleRepo.existsById(id)) return null;
        return scheduleRepo.getOne(id);
    }

    public List<Schedule> getAll() {
        return scheduleRepo.findAll();
    }
}
