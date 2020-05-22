package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Stuff;
import com.transport.university.universitytransportsystem.service.StuffServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/stuff")
public class StuffController {

    @Autowired
    private StuffServices stuffServices;

    @GetMapping("/getById/{id}")
    public Stuff getStuffById(@PathVariable("id") Integer id) {
        return stuffServices.getStuffById(id);
    }

    @GetMapping("/inService/all")
    public List<Stuff> getAllStuffsInService() {
        return stuffServices.getAllStuffsInService();
    }

    @GetMapping("/exService/all")
    public List<Stuff> getAllStuffsExService() {
        return stuffServices.getAllStuffsExService();
    }

    @DeleteMapping("/remove/{stuffId}")
    public ResponseEntity<?> removeStuff(@PathVariable("stuffId") Integer stuffId) {
        stuffServices.removeStuff(stuffId);
        return new ResponseEntity<>("Stuff with ID: " + stuffId + " was deleted", HttpStatus.OK);
    }
}
