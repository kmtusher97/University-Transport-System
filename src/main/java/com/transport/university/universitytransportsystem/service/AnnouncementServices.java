package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Announcement;
import com.transport.university.universitytransportsystem.repository.AnnouncementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AnnouncementServices {

    @Autowired
    private AnnouncementRepo announcementRepo;


    public Announcement addAnnouncement(Announcement announcement) {
        if (announcement.getAnnouncement() == null || announcement.getDate() == null) return null;
        return announcementRepo.save(announcement);
    }

    public Announcement updateAnnouncement(Announcement announcement) {
        if (announcement.getAnnouncementId() == null ||
                !announcementRepo.existsById(announcement.getAnnouncementId())) return null;
        return addAnnouncement(announcement);
    }

    public Announcement getAnnouncementById(Long id) {
        if (announcementRepo.existsById(id)) {
            return announcementRepo.getOne(id);
        }
        return null;
    }

    public void deleteAnnouncementById(Long id) {
        if (announcementRepo.existsById(id)) {
            announcementRepo.deleteById(id);
        }
    }

    public List<Announcement> getNth30AnnouncementsFromBack(Long n) {
        Long announcementCount = announcementRepo.count();
        if (announcementCount == 0 || n <= 0) return new ArrayList<>();
        return announcementRepo.getNth30AnnouncementsFromBack(Math.max(0, announcementCount - (n * 30)));

    }
}
