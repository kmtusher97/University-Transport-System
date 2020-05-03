package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Notification;
import com.transport.university.universitytransportsystem.service.NotificationServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/notification")
public class NotificationController {

    @Autowired
    private NotificationServices notificationServices;

    @GetMapping("/GLOBAL/getById/{id}")
    public Notification getNotificationById(@PathVariable("id") Long id) {
        return notificationServices.getNotificationById(id);
    }

}
