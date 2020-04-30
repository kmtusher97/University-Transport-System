package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Stoppage;
import com.transport.university.universitytransportsystem.service.StoppageServices;
import com.transport.university.universitytransportsystem.validation.MapValidationErrorService;
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

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/add")
    public ResponseEntity<?> addStoppage(@Valid @RequestBody Stoppage stoppage, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        return new ResponseEntity<>(stoppageServices.save(stoppage), HttpStatus.CREATED);
    }

    @GetMapping("/GLOBAL/getAll")
    public List<Stoppage> getAllStoppage() {
        return stoppageServices.getAllStoppage();
    }

    @GetMapping("/GLOBAL/get/{stoppageId}")
    public ResponseEntity<?> getStoppageById(@PathVariable("stoppageId") Integer stoppageId) {
        return new ResponseEntity<>(stoppageServices.getStoppageById(stoppageId), HttpStatus.OK);
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
        if (stoppage.getStoppageId() == null) return mapValidationErrorService.mapNullIdErrorService("stoppageId");
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        return new ResponseEntity<>(stoppageServices.save(stoppage), HttpStatus.CREATED);
    }
}
