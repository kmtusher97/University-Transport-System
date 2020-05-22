package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Notification;
import com.transport.university.universitytransportsystem.service.NotificationServices;
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
@RequestMapping(path = "api/notification")
public class NotificationController {

    @Autowired
    private NotificationServices notificationServices;

    @Autowired
    private MapValidationErrorService errorService;

    @GetMapping("/GLOBAL/{id}")
    public ResponseEntity<?> getNotification(@PathVariable("id") Long id) {
        return new ResponseEntity<>(notificationServices.getNotification(id), HttpStatus.OK);
    }

    @GetMapping("/GLOBAL/all")
    public List<Notification> getAll() {
        return notificationServices.getAll();
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNotification(@Valid @RequestBody Notification notification, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if(errorMap != null) return errorMap;
        return new ResponseEntity<>(notificationServices.saveOrUpdate(notification), HttpStatus.CREATED);
    }
}
