package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Long> {

    @Query(value = "SELECT * FROM notification LIMIT 30 OFFSET ?1", nativeQuery = true)
    List<Notification> get10Notifications(Long fromRow);
}
