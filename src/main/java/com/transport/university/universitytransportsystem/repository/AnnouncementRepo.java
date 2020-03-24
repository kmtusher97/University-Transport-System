package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnnouncementRepo extends JpaRepository<Announcement, Long> {

    @Query(value = "SELECT * FROM announcement LIMIT 30 OFFSET ?1", nativeQuery = true)
    List<Announcement> getNth30AnnouncementsFromBack(long fromRow);
}
