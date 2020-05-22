package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.schedule.ScheduleIdException;
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

    @Autowired
    private NotificationServices notificationServices;

    public Schedule saveOrUpdate(Schedule schedule) {
        if (schedule.getIsComplete() == null) schedule.setIsComplete(false);
        notificationServices.generateNotificationAboutSchedule(schedule);
        return scheduleRepo.save(schedule);
    }

    public void delete(Long id) {
        if (!scheduleRepo.existsById(id)) {
            throw new ScheduleIdException("Schedule Id: " + id + " does not exist");
        }
        scheduleRepo.deleteById(id);
    }

    public Schedule get(Long id) {
        if (!scheduleRepo.existsById(id)) {
            throw new ScheduleIdException("Schedule Id: " + id + " does not exist");
        }
        return scheduleRepo.getOne(id);
    }

    public List<Schedule> getAll() {
        return scheduleRepo.findAll();
    }
}
