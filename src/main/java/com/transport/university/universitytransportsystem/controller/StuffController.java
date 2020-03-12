package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Stuff;
import com.transport.university.universitytransportsystem.service.StuffServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/stuff")
public class StuffController {

    @Autowired
    private StuffServices stuffServices;

    @GetMapping("/inService/all")
    public List<Stuff> getAllStuffsInService() {
        return stuffServices.getAllStuffsInService();
    }

    @GetMapping("/exService/all")
    public List<Stuff> getAllStuffsExService() {
        return stuffServices.getAllStuffsExService();
    }

    @GetMapping("/add/{userId}")
    public Stuff addNewStuff(@PathVariable("userId") Integer userId) {
        return stuffServices.addNewStuff(userId);
    }

    @GetMapping("/remove/{stuffId}")
    public Stuff removeStuff(@PathVariable("stuffId") Integer stuffId) {
        return stuffServices.removeStuff(stuffId);
    }

    @GetMapping("/reEmploy/{stuffId}")
    public Stuff reEmployStuff(@PathVariable("stuffId") Integer stuffId) {
        return stuffServices.reEmployStuff(stuffId);
    }
}
