package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Announcement;
import com.transport.university.universitytransportsystem.service.AnnouncementServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/announcement")
public class AnnouncementController {

    @Autowired
    private AnnouncementServices announcementServices;

    @PostMapping("/add")
    public Announcement addAnnouncement(@RequestBody Announcement announcement) {
        return announcementServices.addAnnouncement(announcement);
    }

    @PostMapping("/update")
    public Announcement updateAnnouncement(@RequestBody Announcement announcement) {
        return announcementServices.updateAnnouncement(announcement);
    }

    @GetMapping("/get/{id}")
    public Announcement getAnnouncementById(@PathVariable("id") Long id) {
        return announcementServices.getAnnouncementById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAnnouncementById(@PathVariable("id") Long id) {
        announcementServices.deleteAnnouncementById(id);
    }
}
