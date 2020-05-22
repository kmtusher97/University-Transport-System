package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.announcement.AnnouncementNotFoundException;
import com.transport.university.universitytransportsystem.model.Announcement;
import com.transport.university.universitytransportsystem.repository.AnnouncementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AnnouncementServices {

    @Autowired
    private AnnouncementRepo announcementRepo;


    public Announcement saveOrUpdate(Announcement announcement) {
        return announcementRepo.save(announcement);
    }

    public Announcement get(Long id) {
        if (!announcementRepo.existsById(id)) {
            throw new AnnouncementNotFoundException("Announcement with ID: " + id + " doesn't exist");
        }
        return announcementRepo.getOne(id);
    }

    public void delete(Long id) {
        if (!announcementRepo.existsById(id)) {
            throw new AnnouncementNotFoundException("Announcement with ID: " + id + " doesn't exist");
        }
        announcementRepo.deleteById(id);
    }

    public List<Announcement> getAll() {
        return announcementRepo.findAll();
    }
}
