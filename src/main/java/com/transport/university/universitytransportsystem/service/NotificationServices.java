package com.transport.university.universitytransportsystem.service;

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

    public Notification getNotificationById(Long id) {
        if (!notificationRepo.existsById(id)) return null;
        return notificationRepo.getOne(id);
    }

    public List<Notification> getLatestNotifications() {
        Long notificationCount = notificationRepo.count();
        if (notificationCount == 0) return new ArrayList<>();
        return notificationRepo.get10Notifications(Math.max(0, notificationCount - 30));
    }
}
