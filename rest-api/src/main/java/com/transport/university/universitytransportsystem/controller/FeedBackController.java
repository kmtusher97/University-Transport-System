package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.FeedBack;
import com.transport.university.universitytransportsystem.service.FeedBackServices;
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
@RequestMapping("api/feedback")
public class FeedBackController {

    @Autowired
    private FeedBackServices feedBackServices;

    @Autowired
    private MapValidationErrorService errorService;

    @PostMapping("/GLOBAL/add")
    public ResponseEntity<?> create(@Valid @RequestBody FeedBack feedBack, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        return new ResponseEntity<>(feedBackServices.saveOrUpdate(feedBack), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<FeedBack> getAll() {
        return feedBackServices.getAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        feedBackServices.delete(id);
        return new ResponseEntity<>("Feedback with ID: " + id + " was deleted", HttpStatus.OK);
    }
}
