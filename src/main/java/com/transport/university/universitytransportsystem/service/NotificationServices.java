package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.notification.NotificationIdException;
import com.transport.university.universitytransportsystem.model.Notification;
import com.transport.university.universitytransportsystem.repository.NotificationRepo;
import com.transport.university.universitytransportsystem.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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


}
