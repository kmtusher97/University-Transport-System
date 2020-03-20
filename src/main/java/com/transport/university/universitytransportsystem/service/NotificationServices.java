package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Notification;
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

    public Notification getNotificationById(Long id) {
        if (!notificationRepo.existsById(id)) return null;
        return notificationRepo.getOne(id);
    }

    private Boolean isValid(Notification notification) {
        if (notification.getDate() == null) return false;
        if (notification.getNotification() == null) return false;
        if (notification.getUser() == null) return false;
        if (notification.getUser().getUserId() == null) return false;
        if (!userRepo.existsById(notification.getUser().getUserId())) return false;
        return true;
    }

    public Notification addNotification(Notification notification) {
        if (!isValid(notification)) return null;
        notification.setUser(userRepo.getOne(notification.getUser().getUserId()));
        return notificationRepo.save(notification);
    }

    public Notification updateNotification(Notification notification) {
        if (notification.getNotificationId() == null) return null;
        return addNotification(notification);
    }

    public void deleteNotificationById(Long id) {
        if (notificationRepo.existsById(id)) {
            notificationRepo.deleteById(id);
        }
    }

    public List<Notification> getLatestNotifications() {
        Long notificationCount = notificationRepo.count();
        if (notificationCount == 0) return null;
        return notificationRepo.get10Notifications(Math.max(0, notificationCount - 10));
    }

    public List<Notification> getNth10Notifications(Long n) {
        Long notificationCount = notificationRepo.count();
        if (notificationCount == 0 || n == 0) return null;
        return notificationRepo.get10Notifications(Math.max(0, notificationCount - (n * 10)));
    }
}
