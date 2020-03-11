package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepo extends JpaRepository<Notification, Long> {
}
