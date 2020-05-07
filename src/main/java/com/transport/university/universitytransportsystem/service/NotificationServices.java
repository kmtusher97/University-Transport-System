package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.notification.NotificationIdException;
import com.transport.university.universitytransportsystem.model.Notification;
import com.transport.university.universitytransportsystem.model.Schedule;
import com.transport.university.universitytransportsystem.repository.NotificationRepo;
import com.transport.university.universitytransportsystem.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NotificationServices {

    @Autowired
    private NotificationRepo notificationRepo;

    @Autowired
    private UserRepo userRepo;

    public Notification getNotification(Long id) {
        if (!notificationRepo.existsById(id)) {
            throw new NotificationIdException("Notification with ID: " + id + " does not exist");
        }
        return notificationRepo.getOne(id);
    }

    public List<Notification> getAll() {
        return notificationRepo.findAll();
    }

    public Notification saveOrUpdate(Notification notification) {
        return notificationRepo.save(notification);
    }

    public void generateNotificationAboutSchedule(Schedule schedule) {
        String notificationString = "Date & Time: " + schedule.getDate().toString() + "\n" +
                "Bus No: " + schedule.getBus().getBusId() + "\n" +
                "Bus Number: " + schedule.getBus().getNumber() + "\n" +
                "Route No: " + schedule.getRoute().getRouteId() + "\n" +
                "Driver Id: " + schedule.getDriver().getDriverId() + "\n" +
                "Driver Name: " + schedule.getDriver().getUser().getFirstName() + " " +
                schedule.getDriver().getUser().getLastName() + "\n";

        Notification notificationForDriver = new Notification(
                null,
                notificationString,
                schedule.getDate(),
                schedule.getDriver().getUser()
        );
        saveOrUpdate(notificationForDriver);

        if (schedule.getStuff() != null) {
            notificationString += ("Stuff Id: " + schedule.getStuff().getStuffId() + "\n" +
                    "Stuff Name: " + schedule.getStuff().getUser().getFirstName() + " " +
                    schedule.getStuff().getUser().getLastName() + "\n"
            );
            Notification notificationForStuff = new Notification(
                    null,
                    notificationString,
                    schedule.getDate(),
                    schedule.getStuff().getUser()
            );
            saveOrUpdate(notificationForStuff);
        }
    }
}
