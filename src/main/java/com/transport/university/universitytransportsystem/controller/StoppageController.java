package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Stoppage;
import com.transport.university.universitytransportsystem.service.StoppageServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = "api/stoppage")
public class StoppageController {

    @Autowired
    private StoppageServices stoppageServices;

    @PostMapping("/add")
    public ResponseEntity<?> addStoppage(@Valid @RequestBody Stoppage stoppage, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(stoppageServices.save(stoppage), HttpStatus.CREATED);
    }

    @GetMapping("/GLOBAL/getAll")
    public List<Stoppage> getAllStoppage() {
        return stoppageServices.getAllStoppage();
    }

    @GetMapping("/GLOBAL/get/{stoppageId}")
    public Stoppage getStoppageById(@PathVariable("stoppageId") Integer stoppageId) {
        return stoppageServices.getStoppageById(stoppageId);
    }

    @GetMapping("/GLOBAL/getByName/{stoppageName}")
    public Stoppage getStoppageByName(@PathVariable("stoppageName") String stoppageName) {
        return stoppageServices.getStoppageByName(stoppageName);
    }

    @DeleteMapping("/delete/{stoppageId}")
    public void deleteStoppage(@PathVariable("stoppageId") Integer stoppageId) {
        stoppageServices.deleteStoppageById(stoppageId);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateStoppage(@Valid @RequestBody Stoppage stoppage, BindingResult result) {
        if (result.hasErrors() || stoppage.getStoppageId() == null) {
            Map<String, String> errorMap = new HashMap<>();
            if (stoppage.getStoppageId() == null) {
                errorMap.put("stoppageId", "Stoppage Id can't be null");
            }
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }
        Stoppage updatedStoppage = stoppageServices.updateStoppage(stoppage);
        if (updatedStoppage == null) {
            return new ResponseEntity<>("Failed to update.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updatedStoppage, HttpStatus.CREATED);
    }
}
