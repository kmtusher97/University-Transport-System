package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepo extends JpaRepository<Announcement, Long> {
}
