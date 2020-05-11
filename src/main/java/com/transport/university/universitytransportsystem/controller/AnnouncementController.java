package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Announcement;
import com.transport.university.universitytransportsystem.service.AnnouncementServices;
import com.transport.university.universitytransportsystem.validation.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/announcement")
public class AnnouncementController {

    @Autowired
    private AnnouncementServices announcementServices;

    @Autowired
    private MapValidationErrorService errorService;

    @PostMapping("/add")
    public ResponseEntity<?> create(@Valid @RequestBody Announcement announcement, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        return new ResponseEntity<>(announcementServices.saveOrUpdate(announcement), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable("id") Long id) {
        return new ResponseEntity<>(announcementServices.get(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<Announcement> getAll(@PathVariable("n") Long n) {
        return announcementServices.getAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        announcementServices.delete(id);
        return new ResponseEntity<>("Announcement with ID: " + id + " was deleted", HttpStatus.OK);
    }
}
