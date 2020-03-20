package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Notification;
import com.transport.university.universitytransportsystem.service.NotificationServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/notification")
public class NotificationController {

    @Autowired
    private NotificationServices notificationServices;

    @GetMapping("/getById/{id}")
    public Notification getNotificationById(@PathVariable("id") Long id) {
        return notificationServices.getNotificationById(id);
    }

    @PostMapping("/add")
    public Notification addNotification(@RequestBody Notification notification) {
        return notificationServices.addNotification(notification);
    }

    @PostMapping("/update")
    public Notification updateNotification(@RequestBody Notification notification) {
        return notificationServices.updateNotification(notification);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteNotificationById(@PathVariable("id") Long id) {
        notificationServices.deleteNotificationById(id);
    }

    @GetMapping("/getLatest")
    public List<Notification> getLatestNotifications() {
        return notificationServices.getLatestNotifications();
    }

    @GetMapping("/get/{n}")
    public List<Notification> getNth10Notifications(@PathVariable("n") Long n) {
        return notificationServices.getNth10Notifications(n);
    }
}
